const { ethers } = require("ethers");
const {
  finisherWallets,
  maticStakingContract,
  grtStakingContract,
  provider,
  rinkebyProvider,
} = require("./constants/config");
const { claim, getUnclaimedOrders } = require("./contracts/claim");

async function claimOne(wallet, claimContract) {
  const orderIds = await getUnclaimedOrders(wallet, claimContract);
  console.log(`Start claiming total ${orderIds.length} orders`, wallet.address);
  if (orderIds.length > 0) {
    const tx = await claim(orderIds, claimContract.connect(wallet));
    console.log(
      `Claimed ${orderIds.length} orders`,
      claimContract.address === maticStakingContract.address ? "Matic" : "Grt",
      tx.hash
    );
  } else {
    console.log("No claimable order. Skipped.");
  }
}

async function claimAll(wallets) {
  console.log(
    "Start claiming",
    wallets.length,
    "wallets",
    new Date().toLocaleTimeString()
  );
  let index = 0;
  for (const wallet of wallets) {
    // Claim Matic
    console.log("\nClaiming Matic...");
    await claimOne(wallet.connect(provider), maticStakingContract);
    // Claim Grt
    console.log("Claiming GRT...");
    await claimOne(wallet.connect(rinkebyProvider), grtStakingContract);
    index++;
    console.log("Done", index, "of", wallets.length);
  }
  console.log("Done");
}

claimAll(finisherWallets);
