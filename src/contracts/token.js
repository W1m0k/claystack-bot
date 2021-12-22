const fetch = require("node-fetch");
const { ethers } = require("ethers");
const { tokens, erc20Abi } = require("../constants/config");
const makeCalls = require("../utils/multicall");

async function allTokens(wallets) {
  const calls = wallets.flatMap((w) => {
    return tokens.map((token) => {
      return {
        target: token.address,
        name: "balanceOf",
        params: [w.address],
      };
    });
  });
  const balances = await makeCalls(erc20Abi, calls);

  const groupedBalances = [];
  for (let i = 0; i < wallets.length; i++) {
    let startIndex = i * tokens.length;
    let endIndex = startIndex + tokens.length;
    const walletBalances = balances
      .slice(startIndex, endIndex)
      .map((balance, i) => {
        return {
          balance,
          symbol: tokens[i].symbol,
          address: tokens[i].address,
        };
      });
    groupedBalances.push(walletBalances);
  }
  return groupedBalances;
}

async function getAllocationLeft(wallet) {
  const info = await fetch(
    `https://app.claystack.com/api/snapshot?address=${wallet.address}`
  ).then((res) => res.json());
  const allocation = info.allocation;
  const neededTokens = allocation
    .filter((allo) => allo.progress < 1)
    .map((allo) => ({
      symbol: allo.symbol,
      id: allo.id,
      needed: ethers.utils.parseEther(
        (
          Math.ceil(
            Math.ceil(info.wallet[allo.symbol] / (allo.progress || 1)) -
              info.wallet[allo.symbol]
          ) + 1
        ).toString()
      ),
    }));
  return neededTokens;
}

module.exports = {
  allTokens,
  getAllocationLeft,
};
