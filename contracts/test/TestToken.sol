// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;
// A plain ERC-20 for tests only.
contract TestToken {
    string public name = "Test"; string public symbol = "TST"; uint8 public decimals = 18; uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    event Transfer(address indexed from, address indexed to, uint256 value);
    constructor(uint256 supply) { totalSupply = supply; balanceOf[msg.sender] = supply; }
    function transfer(address to, uint256 v) external returns (bool) { require(balanceOf[msg.sender] >= v, "balance"); balanceOf[msg.sender] -= v; balanceOf[to] += v; emit Transfer(msg.sender, to, v); return true; }
}
