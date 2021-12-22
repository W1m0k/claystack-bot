// const { wallets, finisherWallets } = require("./constants/config");
// const { getAllocationLeft } = require("./contracts/token");
// const { finish } = require("./contracts/game");
// const { isEnded } = require("./contracts/user");

// async function end(wallet) {
//   const isEnd = await isEnded(wallet);
//   if (isEnd) {
//     console.log("Already ended");
//     return;
//   }
//   const neededTokens = await getAllocationLeft(wallet);
//   if (neededTokens.length === 0) {
//     // can finish
//     const tx = await finish(wallet);
//     console.log("End", tx.hash);
//   } else {
//     console.log("Not enough tokens", wallet.privateKey);
//   }
// }

// async function endAll(wallets) {
//   for (const w of wallets) {
//     await end(w);
//   }
// }

// endAll(finisherWallets.slice(-20));
