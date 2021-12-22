const { ethers } = require("ethers");
const {
  FAUCET_CONTRACT,
  finisherWallets,
  GRT_FAUCET_CONTRACT,
  rinkebyProvider,
  provider,
} = require("./constants/config");

async function faucetMatic(_wallet) {
  const wallet = _wallet.connect(provider);
  const txOptions = {
    to: FAUCET_CONTRACT,
    gasLimit: 300000,
    data: "0xdf8de3e7000000000000000000000000499d11e0b6eac7c0593d8fb292dcbbf815fb29ae",
  };

  try {
    await wallet.estimateGas(txOptions);
    //pass
    const tx = await wallet.sendTransaction(txOptions);
    console.log("Request faucet", tx.hash);
  } catch (e) {
    console.log("Cooldown");
  }
}

async function faucetGrt(_wallet) {
  const wallet = _wallet.connect(rinkebyProvider);
  const txOptions = {
    to: GRT_FAUCET_CONTRACT,
    gasLimit: 300000,
    data: "0xdf8de3e700000000000000000000000054fe55d5d255b8460fb3bc52d5d676f9ae5697cd",
  };

  try {
    await wallet.estimateGas(txOptions);
    //pass
    const tx = await wallet.sendTransaction(txOptions);
    console.log("Request faucet", tx.hash);
  } catch (e) {
    console.log("Cooldown");
  }
}

async function faucetAll(wallets) {
  let index = 0;
  for (const wallet of wallets) {
    await faucetMatic(wallet);
    await faucetGrt(wallet);
    console.log("Done", index + 1, "wallets");
    index++;
  }
}

async function faucetMaticAll(wallets) {
  let index = 0;
  for (const wallet of wallets) {
    await faucetMatic(wallet);
    console.log(index);
    index++;
  }
}

faucetAll(finisherWallets);
// faucetGrt(finisherWallets[0]);
// faucetMaticAll(finisherWallets);

module.exports = {
  faucetMaticAll,
  faucetMatic,
};
