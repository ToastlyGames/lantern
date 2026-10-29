// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

/// @title Lanternhold Cosmetics
/// @notice Cosmetics earned in Lanternhold (the Jack-o'-Lantern, the Reaper's Scythe, ...), as ERC-1155 tokens on
/// Robinhood Chain. Each kind of cosmetic has its own token ID. A cosmetic can only come into being here when a hero
/// earned it in the game: the game's server checks the hero, takes the cosmetic off the hero, and signs a voucher for
/// one token; the player's wallet sends it and pays only gas. Every voucher has its own mintId and works once.
/// In the game, whoever's linked wallet holds the token can wear the cosmetic, so it can be sold or traded freely.
/// Owner controls: pause minting, the voucher signer, the metadata address, royalties (max 10%). The owner can't mint
/// or move anyone's tokens.
interface IERC1155Receiver {
    function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes calldata data) external returns (bytes4);
    function onERC1155BatchReceived(address operator, address from, uint256[] calldata ids, uint256[] calldata values, bytes calldata data) external returns (bytes4);
}

contract LanternCosmetics {
    string public constant name = "Lanternhold Cosmetics";
    string public constant symbol = "LHCOS";

    address public owner;
    address public signer;
    bool public paused;
    string private _uri;                  // token metadata: _uri + id
    string private _contractURI;
    address public royaltyReceiver;
    uint96 public royaltyBps;

    mapping(uint256 => mapping(address => uint256)) private _balances;
    mapping(address => mapping(address => bool)) private _operators;
    mapping(uint256 => uint256) public totalSupply;   // how many of each cosmetic exist on-chain
    mapping(bytes32 => bool) public used;             // each voucher (mintId) mints once

    bytes32 public immutable DOMAIN_SEPARATOR;
    bytes32 public constant MINT_TYPEHASH = keccak256("Mint(address wallet,uint256 id,bytes32 mintId,uint256 deadline)");
    uint256 private constant HALF_N = 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0;

    event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value);
    event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values);
    event ApprovalForAll(address indexed account, address indexed operator, bool approved);
    event URI(string value, uint256 indexed id);
    event BatchMetadataUpdate(uint256 fromTokenId, uint256 toTokenId);
    event Minted(bytes32 indexed mintId, address indexed wallet, uint256 indexed id);
    event SignerChanged(address signer);
    event Paused(bool paused);
    event OwnerChanged(address owner);

    modifier onlyOwner() { require(msg.sender == owner, "not owner"); _; }

    constructor(address signer_, string memory uri_, string memory contractURI_) {
        require(signer_ != address(0), "zero address");
        owner = msg.sender; signer = signer_; _uri = uri_; _contractURI = contractURI_;
        royaltyReceiver = msg.sender; royaltyBps = 500;
        DOMAIN_SEPARATOR = keccak256(abi.encode(
            keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
            keccak256(bytes("LanternCosmetics")), keccak256(bytes("1")), block.chainid, address(this)));
    }

    // ---- minting ----
    /// @notice Turn a cosmetic you earned in the game into a token, with the voucher the game gave you. Gas only.
    function mint(uint256 id, bytes32 mintId, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external {
        require(!paused, "paused");
        require(block.timestamp <= deadline, "voucher expired");
        require(id >= 1, "no cosmetic #0");
        require(!used[mintId], "voucher already used");
        require(uint256(s) <= HALF_N, "bad signature");
        bytes32 digest = keccak256(abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR, keccak256(abi.encode(MINT_TYPEHASH, msg.sender, id, mintId, deadline))));
        address who = ecrecover(digest, v, r, s);
        require(who != address(0) && who == signer, "bad signature");
        used[mintId] = true;
        _balances[id][msg.sender] += 1;
        totalSupply[id] += 1;
        emit TransferSingle(msg.sender, address(0), msg.sender, id, 1);
        emit Minted(mintId, msg.sender, id);
        _checkReceive(msg.sender, address(0), msg.sender, id, 1, "");
    }

    // ---- ERC-1155 ----
    function balanceOf(address a, uint256 id) public view returns (uint256) { require(a != address(0), "zero address"); return _balances[id][a]; }
    function balanceOfBatch(address[] calldata accounts, uint256[] calldata ids) external view returns (uint256[] memory out) {
        require(accounts.length == ids.length, "length mismatch");
        out = new uint256[](accounts.length);
        for (uint256 i = 0; i < accounts.length; i++) out[i] = balanceOf(accounts[i], ids[i]);
    }
    function setApprovalForAll(address op, bool ok) external { require(op != msg.sender, "self"); _operators[msg.sender][op] = ok; emit ApprovalForAll(msg.sender, op, ok); }
    function isApprovedForAll(address a, address op) public view returns (bool) { return _operators[a][op]; }

    function safeTransferFrom(address from, address to, uint256 id, uint256 value, bytes calldata data) external {
        require(from == msg.sender || isApprovedForAll(from, msg.sender), "not allowed");
        require(to != address(0), "zero address");
        uint256 b = _balances[id][from]; require(b >= value, "not enough");
        unchecked { _balances[id][from] = b - value; }
        _balances[id][to] += value;
        emit TransferSingle(msg.sender, from, to, id, value);
        _checkReceive(msg.sender, from, to, id, value, data);
    }
    function safeBatchTransferFrom(address from, address to, uint256[] calldata ids, uint256[] calldata values, bytes calldata data) external {
        require(from == msg.sender || isApprovedForAll(from, msg.sender), "not allowed");
        require(to != address(0), "zero address");
        require(ids.length == values.length, "length mismatch");
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 b = _balances[ids[i]][from]; require(b >= values[i], "not enough");
            unchecked { _balances[ids[i]][from] = b - values[i]; }
            _balances[ids[i]][to] += values[i];
        }
        emit TransferBatch(msg.sender, from, to, ids, values);
        if (to.code.length > 0) {
            require(IERC1155Receiver(to).onERC1155BatchReceived(msg.sender, from, ids, values, data) == IERC1155Receiver.onERC1155BatchReceived.selector, "receiver refused");
        }
    }
    function _checkReceive(address op, address from, address to, uint256 id, uint256 value, bytes memory data) private {
        if (to.code.length > 0) {
            require(IERC1155Receiver(to).onERC1155Received(op, from, id, value, data) == IERC1155Receiver.onERC1155Received.selector, "receiver refused");
        }
    }

    // ---- metadata and royalties ----
    function uri(uint256 id) external view returns (string memory) { return string(abi.encodePacked(_uri, _str(id))); }
    function contractURI() external view returns (string memory) { return _contractURI; }
    function royaltyInfo(uint256, uint256 price) external view returns (address, uint256) { return (royaltyReceiver, price * royaltyBps / 10000); }
    function supportsInterface(bytes4 i) external pure returns (bool) {
        return i == 0x01ffc9a7 || i == 0xd9b67a26 || i == 0x0e89341c || i == 0x2a55205a;   // ERC-165, ERC-1155, metadata URI, ERC-2981
    }

    // ---- owner ----
    function setSigner(address s_) external onlyOwner { require(s_ != address(0), "zero address"); signer = s_; emit SignerChanged(s_); }
    function setPaused(bool p) external onlyOwner { paused = p; emit Paused(p); }
    function setURI(string calldata u) external onlyOwner { _uri = u; emit BatchMetadataUpdate(0, type(uint256).max); }
    function setContractURI(string calldata c) external onlyOwner { _contractURI = c; }
    function setRoyalty(address to, uint96 bps) external onlyOwner { require(bps <= 1000, "max 10%"); require(to != address(0), "zero address"); royaltyReceiver = to; royaltyBps = bps; }
    function transferOwnership(address o) external onlyOwner { require(o != address(0), "zero address"); owner = o; emit OwnerChanged(o); }

    function _str(uint256 v) private pure returns (string memory) {
        if (v == 0) return "0";
        uint256 j = v; uint256 n; while (j != 0) { n++; j /= 10; }
        bytes memory b = new bytes(n); while (v != 0) { n--; b[n] = bytes1(uint8(48 + v % 10)); v /= 10; }
        return string(b);
    }
}
