// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

/// @title Lanternhold rewards vault
/// @notice Holds the game's rewards pool. Fund it in phases: anyone (the owner, normally) can top it up at any time just
/// by sending tokens to this address; the vault is never redeployed. Players earn in the game; when they claim, the
/// game's server signs a voucher for everything they've earned so far, and this contract pays the part not yet paid:
/// 90% to the player, 5% burned (sent to the dead address) and 5% kept here, back in the pool.
///
/// Rewards shrink as the pool shrinks: each UTC day the vault pays out at most `dailyBps` of what it held when the day
/// began (and never more than `dailyCap`), so the emptier the vault, the smaller the most it can pay in a day.
/// The game's own daily budget works the same way (a share of what's left), so rewards taper off instead of running dry.
///
/// The lock: tokens can only leave through player claims. Nobody, the owner included, can withdraw before `unlockAt`
/// (set once, at deploy). The owner can tune the daily limits at any time (to slow payouts if the pool drains too fast),
/// pause claims, and replace the voucher signer; a new signer only takes over 2 days after it's announced on-chain.
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address who) external view returns (uint256);
}

contract LanternRewards {
    IERC20 public immutable token;
    address public owner;
    address public signer;
    bool public paused;

    uint256 public constant BURN_BPS = 500;      // 5% of each claim burned
    uint256 public constant RECYCLE_BPS = 500;   // 5% of each claim stays in the vault
    address public constant DEAD = 0x000000000000000000000000000000000000dEaD;
    uint256 public constant MAX_DAILY_BPS = 1000;   // the daily share can be set from 0.01% up to 10% of the vault
    uint256 public constant SIGNER_DELAY = 2 days;

    uint256 public dailyCap;                     // most the vault pays out (gross) in a UTC day, in token units
    uint256 public dailyBps;                     // ...and at most this share of what it held when the day began (100 = 1%)
    uint256 public immutable unlockAt;           // no withdrawals before this time (unix seconds)
    address public pendingSigner;
    uint256 public pendingSignerAt;
    uint256 public paidDay;
    uint256 public paidToday;
    uint256 public dayStartBalance;              // what the vault held when today's first claim came in

    uint256 public totalGross;
    uint256 public totalBurned;
    uint256 public totalRecycled;
    mapping(address => uint256) public claimed;  // per wallet: everything its vouchers have paid out (gross)

    bytes32 public immutable DOMAIN_SEPARATOR;
    bytes32 public constant CLAIM_TYPEHASH = keccak256("Claim(address wallet,uint256 total,uint256 deadline)");
    uint256 private constant HALF_N = 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0;

    event Claimed(address indexed wallet, uint256 gross, uint256 net, uint256 burned, uint256 recycled);
    event SignerChanged(address signer);
    event SignerProposed(address signer, uint256 activeAt);
    event Paused(bool paused);
    event DailyLimitsChanged(uint256 cap, uint256 bps);
    event OwnerChanged(address owner);
    event Withdrawn(address to, uint256 amount);

    modifier onlyOwner() { require(msg.sender == owner, "not owner"); _; }

    constructor(address token_, address signer_, uint256 dailyCap_, uint256 dailyBps_, uint256 unlockAt_) {
        require(token_ != address(0) && signer_ != address(0), "zero address");
        require(dailyBps_ >= 1 && dailyBps_ <= MAX_DAILY_BPS, "daily share out of range");
        require(unlockAt_ > block.timestamp, "unlock must be in the future");
        token = IERC20(token_); signer = signer_; dailyCap = dailyCap_; dailyBps = dailyBps_; unlockAt = unlockAt_; owner = msg.sender;
        DOMAIN_SEPARATOR = keccak256(abi.encode(
            keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
            keccak256(bytes("LanternRewards")), keccak256(bytes("1")), block.chainid, address(this)));
    }

    /// @notice Claim rewards. `total` is everything this wallet has earned so far (from the game's voucher).
    function claim(uint256 total, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external {
        require(!paused, "paused");
        require(block.timestamp <= deadline, "voucher expired");
        require(uint256(s) <= HALF_N, "bad signature");
        bytes32 digest = keccak256(abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR, keccak256(abi.encode(CLAIM_TYPEHASH, msg.sender, total, deadline))));
        address who = ecrecover(digest, v, r, s);
        require(who != address(0) && who == signer, "bad signature");
        uint256 prev = claimed[msg.sender];
        require(total > prev, "nothing to claim");
        uint256 gross = total - prev;
        claimed[msg.sender] = total;

        _rollDay();
        require(paidToday + gross <= _limit(), "daily limit reached, try tomorrow");
        paidToday += gross;

        uint256 burn = gross * BURN_BPS / 10000;
        uint256 recycle = gross * RECYCLE_BPS / 10000;
        uint256 net = gross - burn - recycle;
        totalGross += gross; totalBurned += burn; totalRecycled += recycle;

        _send(msg.sender, net);
        if (burn > 0) _send(DEAD, burn);
        emit Claimed(msg.sender, gross, net, burn, recycle);
    }

    /// @notice The most the vault can still pay out today (gross), under both daily limits.
    function todayLeft() external view returns (uint256) {
        uint256 day = block.timestamp / 1 days;
        uint256 start = day == paidDay ? dayStartBalance : token.balanceOf(address(this));
        uint256 paid = day == paidDay ? paidToday : 0;
        uint256 lim = _min(dailyCap, start * dailyBps / 10000);
        return lim > paid ? lim - paid : 0;
    }

    /// @notice What a voucher for `total` would pay `wallet` right now: [gross, net to the player].
    function preview(address wallet, uint256 total) external view returns (uint256 gross, uint256 net) {
        uint256 prev = claimed[wallet];
        if (total <= prev) return (0, 0);
        gross = total - prev;
        net = gross - gross * BURN_BPS / 10000 - gross * RECYCLE_BPS / 10000;
    }

    function vaultBalance() external view returns (uint256) { return token.balanceOf(address(this)); }

    // ---- owner ----
    /// @notice Tune the daily payout limits (any time): `cap` in token units, `bps` as a share of the vault (100 = 1%).
    function setDailyLimits(uint256 cap, uint256 bps) external onlyOwner {
        require(bps >= 1 && bps <= MAX_DAILY_BPS, "daily share out of range");
        dailyCap = cap; dailyBps = bps; emit DailyLimitsChanged(cap, bps);
    }
    /// @notice Propose a new voucher signer (e.g. if the server key must be replaced). It can take over after 2 days.
    function proposeSigner(address s) external onlyOwner { require(s != address(0), "zero address"); pendingSigner = s; pendingSignerAt = block.timestamp + SIGNER_DELAY; emit SignerProposed(s, pendingSignerAt); }
    function activateSigner() external onlyOwner {
        require(pendingSigner != address(0) && block.timestamp >= pendingSignerAt, "not yet");
        signer = pendingSigner; pendingSigner = address(0); pendingSignerAt = 0; emit SignerChanged(signer);
    }
    function setPaused(bool p) external onlyOwner { paused = p; emit Paused(p); }
    function transferOwnership(address o) external onlyOwner { require(o != address(0), "zero address"); owner = o; emit OwnerChanged(o); }
    /// @notice Move tokens out (e.g. to a new vault). Only after `unlockAt`, and only while claims are paused.
    function withdraw(address to, uint256 amount) external onlyOwner { require(block.timestamp >= unlockAt, "locked"); require(paused, "pause first"); _send(to, amount); emit Withdrawn(to, amount); }

    function _rollDay() private {
        uint256 day = block.timestamp / 1 days;
        if (day != paidDay) { paidDay = day; paidToday = 0; dayStartBalance = token.balanceOf(address(this)); }
    }
    function _limit() private view returns (uint256) { return _min(dailyCap, dayStartBalance * dailyBps / 10000); }
    function _min(uint256 a, uint256 b) private pure returns (uint256) { return a < b ? a : b; }
    function _send(address to, uint256 amount) private {
        (bool ok, bytes memory ret) = address(token).call(abi.encodeWithSelector(IERC20.transfer.selector, to, amount));
        require(ok && (ret.length == 0 || abi.decode(ret, (bool))), "token transfer failed");
    }
}
