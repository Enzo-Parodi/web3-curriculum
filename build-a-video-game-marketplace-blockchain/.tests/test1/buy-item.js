import {
  getAddressBalance,
  getTransactions,
  getItemPrice,
  writeTransactions
} from './blockchain-helpers.js';

import EC from 'elliptic';
const ec = new EC.ec('p192');

const buyerPrivateKey = process.argv[2];
const itemBought = process.argv[3];
// Add your code below
const fromKeyPair = ec.keyFromPrivate(buyerPrivateKey, 'hex')
const buyerAddress = fromKeyPair.getPublic('hex')
const buyerBalance = getAddressBalance(buyerAddress);
const price = getItemPrice(itemBought)

if (buyerBalance >= price) {
  const signature = fromKeyPair.sign(buyerAddress + price + itemBought).toDER('hex')
  const transactions = getTransactions();
  const newTransaction = {
    buyerAddress,
    sellerAddress: null,
    price,
    itemBought,
    signature,
  }

  writeTransactions([...transactions, newTransaction])
}