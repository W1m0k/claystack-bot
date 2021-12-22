// const { ethers } = require("ethers");
// const { wallets, gameContract } = require("./constants/config");

// console.log("Total wallets", wallets.length);

// async function claimPackage(wallet) {
//   try {
//     const txOptions = {
//       to: gameContract.address,
//       data: "0xaaac9718",
//       gasLimit: 500000,
//       gasPrice: ethers.utils.parseUnits("5", "gwei"),
//     };
//     await wallet.estimateGas(txOptions);
//     // should be ok
//     return wallet.sendTransaction(txOptions);
//   } catch (e) {
//     console.log(e);
//     return null;
//   }
// }

// async function run() {
//   console.log("Claiming package..", new Date().toLocaleTimeString());
//   const results = await Promise.all(
//     wallets.map((wallet) => claimPackage(wallet))
//   );
//   const successWallets = results
//     .map((result, i) => (result ? wallets[i].address : null))
//     .filter((r) => r);
//   console.log("Successfully claimed wallets:", successWallets);
//   console.log("Cooldown wallets", wallets.length - successWallets.length);
// }

// run();
