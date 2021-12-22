const makeCalls = require("../utils/multicall");
const fetch = require("node-fetch");
const { gameContract, gameAbi } = require("../constants/config");

async function multicallAllocations(wallets) {
  const calls = wallets.map((w) => ({
    name: "getAllocation",
    target: gameContract.address,
    params: [w.address],
  }));
  const response = await makeCalls(gameAbi, calls);
  return response;
}

async function finish(wallet) {
  const response = await fetch(
    `https://app.claystack.com/api/game?address=${wallet.address}`
  ).then((res) => res.json());
  const signer = gameContract.connect(wallet);
  const tx = await signer.end(response.prices, response.signature, {
    gasLimit: 500000,
  });
  return tx;
}

module.exports = {
  multicallAllocations,
  finish,
};
