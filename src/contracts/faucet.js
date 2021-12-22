const { Contract } = require("ethers");
const { maticFaucetContract, MATIC_CONTRACT } = require("../constants/config");

async function isUserFaucetReady(wallet) {
  const result = await maticFaucetContract.getUsersCooldown(
    MATIC_CONTRACT,
    wallet.address
  );
  const isReady = result.currentTime.gt(result.claimTime);
  return isReady;
}

module.exports = {
  isUserFaucetReady,
};
