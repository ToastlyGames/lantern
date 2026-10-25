// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

/// @title Lanternhold rewards vault
/// @notice Holds the game's rewards pool (50M tokens at launch). Players earn in the game; when they claim, the game's
/// server signs a voucher for everything they've earned so far, and this contract pays the part not yet paid:
/// 90% to the player, 5% burned (sent to the dead address) and 5% kept here, back in the pool.
/// Safety: only the server's signing key can write vouchers, vouchers are cumulative and per wallet (one can't be
/// used twice), there's a daily payout cap, and the owner can pause claims. The owner can only take tokens out while
/// claims are paused, so any withdrawal is visible on-chain first.
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

    uint256 public dailyCap;                     // most the vault pays out (gross) per UTC day
    uint256 public paidDay;
    uint256 public paidToday;

    uint256 public totalGross;
    uint256 public totalBurned;
    uint256 public totalRecycled;
    mapping(address => uint256) public claimed;  // per wallet: everything its vouchers have paid out (gross)

    bytes32 public immutable DOMAIN_SEPARATOR;
    bytes32 public constant CLAIM_TYPEHASH = keccak256("Claim(address wallet,uint256 total,uint256 deadline)");
    uint256 private constant HALF_N = 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0;

    event Claimed(address indexed wallet, uint256 gross, uint256 net, uint256 burned, uint256 recycled);
    event SignerChanged(address signer);
    event Paused(bool paused);
    event DailyCapChanged(uint256 cap);
    event OwnerChanged(address owner);
    event Withdrawn(address to, uint256 amount);

    modifier onlyOwner() { require(msg.sender == owner, "not owner"); _; }

    constructor(address token_, address signer_, uint256 dailyCap_) {
        require(token_ != address(0) && signer_ != address(0), "zero address");
        token = IERC20(token_); signer = signer_; dailyCap = dailyCap_; owner = msg.sender;
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

        uint256 day = block.timestamp / 1 days;
        if (day != paidDay) { paidDay = day; paidToday = 0; }
        require(paidToday + gross <= dailyCap, "daily cap reached, try tomorrow");
        paidToday += gross;

        uint256 burn = gross * BURN_BPS / 10000;
        uint256 recycle = gross * RECYCLE_BPS / 10000;
        uint256 net = gross - burn - recycle;
        totalGross += gross; totalBurned += burn; totalRecycled += recycle;

        _send(msg.sender, net);
        if (burn > 0) _send(DEAD, burn);
        emit Claimed(msg.sender, gross, net, burn, recycle);
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
    function setSigner(address s) external onlyOwner { require(s != address(0), "zero address"); signer = s; emit SignerChanged(s); }
    function setPaused(bool p) external onlyOwner { paused = p; emit Paused(p); }
    function setDailyCap(uint256 c) external onlyOwner { dailyCap = c; emit DailyCapChanged(c); }
    function transferOwnership(address o) external onlyOwner { require(o != address(0), "zero address"); owner = o; emit OwnerChanged(o); }
    /// @notice Move tokens out (to migrate to a new vault). Only while claims are paused.
    function withdraw(address to, uint256 amount) external onlyOwner { require(paused, "pause first"); _send(to, amount); emit Withdrawn(to, amount); }

    function _send(address to, uint256 amount) private {
        (bool ok, bytes memory ret) = address(token).call(abi.encodeWithSelector(IERC20.transfer.selector, to, amount));
        require(ok && (ret.length == 0 || abi.decode(ret, (bool))), "token transfer failed");
    }
}
