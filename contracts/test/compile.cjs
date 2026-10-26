// Compile: npm i --no-save solc@0.8.26 ganache@7.9.2, then node contracts/test/compile.cjs (writes contracts/LanternRewards.json and LanternFounders.json)
const solc = require('solc'), fs = require('fs'), path = require('path').join(__dirname, '..') + '/';
const src = f => ({ content: fs.readFileSync(path + f, 'utf8') });
const input = { language: 'Solidity', sources: { 'LanternRewards.sol': src('LanternRewards.sol'), 'LanternFounders.sol': src('LanternFounders.sol'), 'TestToken.sol': src('test/TestToken.sol') },
  settings: { optimizer: { enabled: true, runs: 200 }, evmVersion: 'paris', outputSelection: { '*': { '*': ['abi', 'evm.bytecode.object'] } } } };
const out = JSON.parse(solc.compile(JSON.stringify(input)));
for (const e of out.errors || []) console.log(e.severity, e.formattedMessage);
if ((out.errors || []).some(e => e.severity === 'error')) process.exit(1);
const R = out.contracts['LanternRewards.sol'].LanternRewards, T = out.contracts['TestToken.sol'].TestToken;
fs.writeFileSync(path + 'LanternRewards.json', JSON.stringify({ compiler: 'solc 0.8.26, optimizer 200 runs, evm paris', abi: R.abi, bytecode: '0x' + R.evm.bytecode.object }, null, 1));
const F = out.contracts['LanternFounders.sol'].LanternFounders;
fs.writeFileSync(path + 'LanternFounders.json', JSON.stringify({ compiler: 'solc 0.8.26, optimizer 200 runs, evm paris', abi: F.abi, bytecode: '0x' + F.evm.bytecode.object }, null, 1));
fs.writeFileSync(__dirname + '/TestToken.json', JSON.stringify({ abi: T.abi, bytecode: '0x' + T.evm.bytecode.object }));
console.log('compiled', R.evm.bytecode.object.length / 2, 'bytes;', 'founders', F.evm.bytecode.object.length / 2, 'bytes');
