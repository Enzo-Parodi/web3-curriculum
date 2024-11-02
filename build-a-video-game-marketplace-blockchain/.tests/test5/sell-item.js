import {
  getAddressItems,
  getItemPrice,
  getTransactions,
  writeTransactions
} from './blockchain-helpers.js';

import EC from 'elliptic';
const ec = new EC.ec('p192');

const sellerPrivateKey = process.argv[2];
const itemSold = process.argv[3];
// Add your code below
const fromKeyPair = ec.keyFromPrivate(sellerPrivateKey, 'hex')
const sellerAddress = fromKeyPair.getPublic('hex')
const price = getItemPrice(itemSold) - 5
const sellerItems = getAddressItems(sellerAddress)
const sellerHasItemSold = sellerItems[itemSold] > 0;

if (sellerHasItemSold) {
  const signature = fromKeyPair.sign(sellerAddress + price + itemSold).toDER('hex')
  const transactions = getTransactions();
  const newTransaction = {
    buyerAddress: null,
    sellerAddress,
    price,
    itemSold,
    signature,
  }

  writeTransactions([...transactions, newTransaction])
}
