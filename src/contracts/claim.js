const { ethers } = require("ethers");
const {
  CLAIM_COOLDOWN,
  CLAIM_COOLDOWN_MATIC,
  maticStakingContract,
  MATIC_STAKING_CONTRACT,
  MATIC_STAKE_MANAGER_CONTRACT,
} = require("../constants/config");

function claim(ids, claimContract) {
  return claimContract.claim(ids);
}

async function getUnclaimedOrders(wallet, claimContract) {
  // query events from last 50k blocks
  const filterWithdraw = claimContract.filters.LogWithdraw(wallet.address);
  let now = Math.floor(new Date().getTime() / 1000);
  let filterClaim = claimContract.filters.LogClaim(wallet.address);
  const isMatic = claimContract.address === maticStakingContract.address;
  if (isMatic) {
    filterClaim = {
      address: MATIC_STAKING_CONTRACT,
      topics: [
        "0x43236f0f39c52b337b0925119217c5e32cf752a69a2ae06b1e0a9652ec36a02e",
        ethers.utils.hexZeroPad(wallet.address, 32),
      ],
    };
    const contract = new ethers.Contract(
      MATIC_STAKE_MANAGER_CONTRACT,
      [
        {
          inputs: [],
          name: "currentEpoch",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      wallet
    );
    now = await contract.currentEpoch();
  }
  const eventWithdraw = await claimContract.queryFilter(
    filterWithdraw,
    -500000,
    "latest"
  );
  const eventClaims = await claimContract.queryFilter(
    filterClaim,
    -50000,
    "latest"
  );
  let claimedOrderIds;
  if (claimContract.address === maticStakingContract.address) {
    claimedOrderIds = eventClaims.map((event) =>
      ethers.BigNumber.from(event.data.slice(0, 66))
    );
  } else {
    claimedOrderIds = eventClaims.map((event) => event.args.orderId);
  }
  const claimableOrderIds = eventWithdraw
    .map((event) => ({
      orderId: event.args.orderId,
      claimable: ethers.BigNumber.from(now)
        .sub(event.args.epoch)
        .gte(isMatic ? CLAIM_COOLDOWN_MATIC : CLAIM_COOLDOWN),
    }))
    .filter(
      (event) =>
        !claimedOrderIds.find((orderId) => orderId.eq(event.orderId)) &&
        event.claimable
    )
    .map((event) => event.orderId);
  return claimableOrderIds;
}

module.exports = {
  getUnclaimedOrders,
  claim,
};
