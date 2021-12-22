const { ethers } = require("ethers");
const {
  finisherWallets,
  rinkebyProvider,
  provider,
} = require("./constants/config");

async function fundEth(receiverWallets, funder) {
  for (const wallet of receiverWallets) {
    if (wallet.address !== funder.address) {
      const tx = await funder.connect(provider).sendTransaction({
        to: wallet.address,
        value: ethers.utils.parseEther("0.02"),
      });
      console.log("Fund", wallet.address, tx.hash);
    }
  }
  console.log("done");
}

async function fundEthRinkeby(receiverWallets, funder) {
  for (const wallet of receiverWallets) {
    if (wallet.address !== funder.address) {
      const tx = await funder.connect(rinkebyProvider).sendTransaction({
        to: wallet.address,
        value: ethers.utils.parseEther("0.02"),
      });
      console.log("Fund", wallet.address, tx.hash);
    }
  }
  console.log("done");
}

async function fundAll(receieverWallets, funder) {
  console.log("fund eth on goerli...");
  await fundEth(receieverWallets, funder);
  console.log("fund eth on rinkeby...");
  await fundEthRinkeby(receieverWallets, funder);
}

fundAll(finisherWallets, finisherWallets[0]);

module.exports = {
  fundAll,
};
