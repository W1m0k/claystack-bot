const { userContract, finisherWallets } = require("./constants/config");
const { multicallAllocations } = require("./contracts/game");

async function canRefer(address) {
  const result = await userContract.canRefer(address);
  console.log(result);
  return result;
}

async function runCanRefer(wallets) {
  for (const wallet of wallets) {
    const result = await canRefer(wallet.address);
    console.log("can refer", result, wallet.privateKey);
  }
}

async function isRegistered(address) {
  const result = await userContract.isRegistered(address);
  return result;
}

async function runIsRegistered(wallets) {
  for (const wallet of wallets) {
    const result = await isRegistered(wallet.address);
    console.log(wallet.address, "is registered", result);
  }
}

async function runIsStarted(wallets) {
  const allocations = await multicallAllocations(wallets);
  let count = 0;
  let index = 0;
  for (const allo of allocations) {
    if (allo.length === 0) {
      console.log(wallets[index].address, wallets[index].privateKey);
      count++;
    }
    index++;
  }
  console.log("Total started", wallets.length - count);
  console.log("Total not yet started", count);
}

function printAddressAndPrivateKey(wallets) {
  for (let i = 0; i < wallets.length; i++) {
    const wallet = wallets[i];
    console.log(i, wallet.address, wallet.privateKey);
  }
}

printAddressAndPrivateKey(finisherWallets);
// canRefer("0xeA7aACc45e24D0F94866fC728d5544394525F7D8");
// runCanRefer([{ address: "0xeA7aACc45e24D0F94866fC728d5544394525F7D8" }]);
// runIsRegistered(inviteeWallets);
// runIsStarted(wallets);
// canRefer("0x06c9011b5EafE2DC7E15c29362e134FE176e1685");
