import {
  getBlockchain,
  getTransactions,
  writeBlockchain,
  writeTransactions
} from './blockchain-helpers.js';

import sha256 from 'crypto-js/sha256.js';
// Add your code below

const blockchain = getBlockchain()
const transactions = getTransactions()
const previousBlock = blockchain[blockchain.length - 1]
let nonce = 0;
let hash = sha256(nonce + previousBlock.hash + JSON.stringify(transactions)).toString();
const difficulty = 2;

while (!hash.startsWith('0'.repeat(difficulty))) {
  nonce++;
  hash = sha256(nonce + previousBlock.hash + JSON.stringify(transactions)).toString()
}

const newBlock = {
  hash,
  previousHash: previousBlock.hash,
  nonce,
  transactions: getTransactions(),
}

writeBlockchain([...blockchain, newBlock])
writeTransactions([])