import {
  getTransactions,
  writeTransactions,
  getWallets,
  writeWallets
} from './blockchain-helpers.js';

import EC from 'elliptic';
const ec = new EC.ec('p192');

const newWalletName = process.argv[2];
// Add your code below
const walletKeyPair = ec.genKeyPair(newWalletName);
const privateKey = walletKeyPair.getPrivate('hex');
const publicKey = walletKeyPair.getPublic('hex');
const wallets = getWallets();

writeWallets({ ...wallets, [newWalletName]: { privateKey, publicKey } })

const transactions = getTransactions();
const newTransaction = {
  buyerAddress: null,
  sellerAddress: publicKey,
  price: 40
}

writeTransactions([...transactions, newTransaction])