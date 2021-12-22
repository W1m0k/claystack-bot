// const { getAllocationLeft, allTokens } = require("./contracts/token");
// const { multicallAllocations } = require("./contracts/game");
// const { donatorWallets, erc20Abi, tokens } = require("./constants/config");
// const { ethers } = require("ethers");
// const { isEnded } = require("./contracts/user");

// const MAXIMUM_AMOUNT_ALLOWED = "3000";

// async function donate(wallet) {
//   const ended = await isEnded(wallet);
//   if (ended) {
//     return console.log("Already ended");
//   }
//   const neededTokens = await getAllocationLeft(wallet);
//   if (neededTokens.length === 0) {
//     return console.log("Enough tokens.");
//   }
//   const tooManyDemandToken = neededTokens.find((token) =>
//     token.needed.gt(ethers.utils.parseEther(MAXIMUM_AMOUNT_ALLOWED))
//   );
//   if (tooManyDemandToken) {
//     console.log("Skip wallet", wallet.address);
//     return console.log(
//       "Too many demand",
//       tooManyDemandToken.symbol,
//       ethers.utils.formatEther(tooManyDemandToken.needed).toString()
//     );
//   }
//   console.log(
//     neededTokens.map((token) => ({
//       ...token,
//       needed: ethers.utils.formatEther(token.needed).toString(),
//     }))
//   );

//   for (const token of neededTokens) {
//     const allocations = await multicallAllocations(donatorWallets).then(
//       (_allocations) =>
//         _allocations.map((allocation) => allocation.map((a) => parseInt(a)))
//     );
//     const _donaterWallets = donatorWallets.filter(
//       (_wallet, i) => allocations[i].indexOf(token.id) === -1
//     );
//     console.log("Donaters", _donaterWallets.length, "wallets");
//     const donaterBalances = await allTokens(_donaterWallets);

//     let requiredAmount = token.needed;
//     for (let i = 0; i < _donaterWallets.length; i++) {
//       const erc20Contract = new ethers.Contract(
//         tokens[token.id].address,
//         erc20Abi,
//         _donaterWallets[i]
//       );
//       const donaterTokenBalances = donaterBalances.map(
//         (balance) => balance[token.id].balance
//       );
//       let amount;
//       let shouldBreak = false;
//       if (donaterTokenBalances[i].lt(requiredAmount)) {
//         amount = donaterTokenBalances[i];
//         requiredAmount = requiredAmount.sub(donaterTokenBalances[i]);
//       } else {
//         amount = requiredAmount;
//         shouldBreak = true;
//       }
//       if (amount.gt("0")) {
//         const tx = await erc20Contract.transfer(wallet.address, amount, {
//           gasLimit: 100000,
//         });
//         console.log(
//           "Donated",
//           ethers.utils.formatEther(amount) + ` ${token.symbol}`,
//           tx.hash
//         );
//       } else {
//         console.log("Not enough tokens");
//       }
//       if (shouldBreak) break;
//     }
//   }
// }

// async function keepDonating(wallets, i) {
//   let count = i;
//   for (const wallet of wallets.slice(i)) {
//     await donate(wallet);
//     console.log("Done wallet", wallet.address, wallet.privateKey, count);
//     count++;
//   }
// }

// // keepDonating(wallets, 0);
// donate({ address: "0x1b87D9b09E87447A91C5B96eDaA24d7aa81abe76" });
