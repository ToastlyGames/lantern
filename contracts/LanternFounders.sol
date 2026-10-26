// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

/// @title Lanternhold Founders (the Founder's Lantern)
/// @notice A free NFT for the first heroes of Lanternhold, on Robinhood Chain. Each token's ID is the hero's number
/// (Hero #1 is the first hero ever made), so every hero number can be minted once, and only up to `maxId` (1,000 at
/// launch: the whitelist is the first 1,000 heroes). The game's server checks the hero and signs a voucher; the
/// player's wallet sends it here and pays only gas. One per wallet. Holders get the Founder's Flame in the game,
/// a light colour no one else has, for as long as they hold one.
/// Owner controls: pause, the voucher signer, the metadata address, royalties (max 10%), the mint end time, and
/// raising `maxId` for a later phase. The owner can't mint, move or take anyone's token.
interface IERC721Receiver {
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external returns (bytes4);
}

contract LanternFounders {
    string public constant name = "Lanternhold Founders";
    string public constant symbol = "FOUNDER";

    address public owner;
    address public signer;
    bool public paused;
    uint256 public maxId;                 // highest hero number that can mint (1,000 = the first 1,000 heroes)
    uint256 public mintEnd;               // 0 = no end; otherwise minting closes at this unix time
    uint256 public totalSupply;
    string private _base;                 // token metadata: _base + tokenId
    string private _contractURI;
    address public royaltyReceiver;
    uint96 public royaltyBps;

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _approved;
    mapping(address => mapping(address => bool)) private _operators;
    mapping(address => bool) public hasMinted;     // one mint per wallet, ever (even if they later sell it)

    bytes32 public immutable DOMAIN_SEPARATOR;
    bytes32 public constant MINT_TYPEHASH = keccak256("Mint(address wallet,uint256 heroNo,uint256 deadline)");
    uint256 private constant HALF_N = 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    event BatchMetadataUpdate(uint256 fromTokenId, uint256 toTokenId);
    event SignerChanged(address signer);
    event Paused(bool paused);
    event MaxIdChanged(uint256 maxId);
    event MintEndChanged(uint256 mintEnd);
    event OwnerChanged(address owner);

    modifier onlyOwner() { require(msg.sender == owner, "not owner"); _; }

    constructor(address signer_, uint256 maxId_, string memory base_, string memory contractURI_) {
        require(signer_ != address(0), "zero address");
        owner = msg.sender; signer = signer_; maxId = maxId_; _base = base_; _contractURI = contractURI_;
        royaltyReceiver = msg.sender; royaltyBps = 500;
        DOMAIN_SEPARATOR = keccak256(abi.encode(
            keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
            keccak256(bytes("LanternFounders")), keccak256(bytes("1")), block.chainid, address(this)));
    }

    // ---- minting ----
    /// @notice Mint your Founder's Lantern with the voucher the game gave you. Free: you only pay gas.
    function mint(uint256 heroNo, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external {
        require(!paused, "paused");
        require(mintEnd == 0 || block.timestamp <= mintEnd, "minting has ended");
        require(block.timestamp <= deadline, "voucher expired");
        require(heroNo >= 1 && heroNo <= maxId, "not on the whitelist");
        require(_owners[heroNo] == address(0), "already minted");
        require(!hasMinted[msg.sender], "this wallet already minted one");
        require(uint256(s) <= HALF_N, "bad signature");
        bytes32 digest = keccak256(abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR, keccak256(abi.encode(MINT_TYPEHASH, msg.sender, heroNo, deadline))));
        address who = ecrecover(digest, v, r, s);
        require(who != address(0) && who == signer, "bad signature");
        hasMinted[msg.sender] = true;
        _owners[heroNo] = msg.sender;
        _balances[msg.sender] += 1;
        totalSupply += 1;
        emit Transfer(address(0), msg.sender, heroNo);
    }

    /// @notice Has this hero number been minted? (ownerOf reverts for unminted tokens, as ERC-721 says.)
    function minted(uint256 heroNo) external view returns (bool) { return _owners[heroNo] != address(0); }

    // ---- ERC-721 ----
    function balanceOf(address a) external view returns (uint256) { require(a != address(0), "zero address"); return _balances[a]; }
    function ownerOf(uint256 id) public view returns (address o) { o = _owners[id]; require(o != address(0), "not minted"); }
    function approve(address to, uint256 id) external {
        address o = ownerOf(id);
        require(msg.sender == o || _operators[o][msg.sender], "not allowed");
        _approved[id] = to; emit Approval(o, to, id);
    }
    function getApproved(uint256 id) external view returns (address) { ownerOf(id); return _approved[id]; }
    function setApprovalForAll(address op, bool ok) external { _operators[msg.sender][op] = ok; emit ApprovalForAll(msg.sender, op, ok); }
    function isApprovedForAll(address o, address op) external view returns (bool) { return _operators[o][op]; }

    function transferFrom(address from, address to, uint256 id) public {
        address o = ownerOf(id);
        require(o == from, "wrong owner");
        require(to != address(0), "zero address");
        require(msg.sender == o || _approved[id] == msg.sender || _operators[o][msg.sender], "not allowed");
        delete _approved[id];
        unchecked { _balances[from] -= 1; }
        _balances[to] += 1;
        _owners[id] = to;
        emit Transfer(from, to, id);
    }
    function safeTransferFrom(address from, address to, uint256 id) external { safeTransferFrom(from, to, id, ""); }
    function safeTransferFrom(address from, address to, uint256 id, bytes memory data) public {
        transferFrom(from, to, id);
        if (to.code.length > 0) require(IERC721Receiver(to).onERC721Received(msg.sender, from, id, data) == IERC721Receiver.onERC721Received.selector, "receiver refused");
    }

    function tokenURI(uint256 id) external view returns (string memory) { ownerOf(id); return string(abi.encodePacked(_base, _str(id))); }
    function contractURI() external view returns (string memory) { return _contractURI; }
    /// @notice EIP-2981 royalties for marketplaces that honour them.
    function royaltyInfo(uint256, uint256 price) external view returns (address, uint256) { return (royaltyReceiver, price * royaltyBps / 10000); }
    function supportsInterface(bytes4 id) external pure returns (bool) {
        return id == 0x01ffc9a7 || id == 0x80ac58cd || id == 0x5b5e139f || id == 0x2a55205a || id == 0x49064906;   // 165, 721, 721 metadata, 2981, 4906
    }

    // ---- owner ----
    function setSigner(address s_) external onlyOwner { require(s_ != address(0), "zero address"); signer = s_; emit SignerChanged(s_); }
    function setPaused(bool p) external onlyOwner { paused = p; emit Paused(p); }
    /// @notice Open a later phase to more hero numbers. It can only go up, so no one's place is ever taken away.
    function setMaxId(uint256 m) external onlyOwner { require(m >= maxId, "can only raise"); maxId = m; emit MaxIdChanged(m); }
    function setMintEnd(uint256 t) external onlyOwner { mintEnd = t; emit MintEndChanged(t); }
    function setBaseURI(string calldata b) external onlyOwner { _base = b; emit BatchMetadataUpdate(1, type(uint256).max); }
    function setContractURI(string calldata c) external onlyOwner { _contractURI = c; }
    function setRoyalty(address to, uint96 bps) external onlyOwner { require(bps <= 1000, "max 10%"); royaltyReceiver = to; royaltyBps = bps; }
    function transferOwnership(address o) external onlyOwner { require(o != address(0), "zero address"); owner = o; emit OwnerChanged(o); }

    function _str(uint256 v) private pure returns (string memory) {
        if (v == 0) return "0";
        uint256 n; for (uint256 t = v; t != 0; t /= 10) n++;
        bytes memory b = new bytes(n);
        while (v != 0) { n--; b[n] = bytes1(uint8(48 + v % 10)); v /= 10; }
        return string(b);
    }
}
