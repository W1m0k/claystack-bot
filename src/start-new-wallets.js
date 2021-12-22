// const { ethers } = require("ethers");
// const {
//   wallets,
//   provider,
//   splitEthContract,
//   userContract,
//   gameContract,
// } = require("./constants/config");
// const { write } = require("./utils/saveToFile");

// async function startGame(wallets) {
//   await Promise.all(
//     wallets.map((wallet) => {
//       return gameContract
//         .connect(wallet)
//         .start({
//           gasLimit: 500000,
//         })
//         .catch((e) => console.log(wallet.privateKey, "failed"));
//     })
//   );
//   console.log(
//     wallets.map((w) => w.address),
//     "started"
//   );
// }

// const abiEncoder = new ethers.utils.AbiCoder();

// async function invite(wInviters, wInvitees) {
//   let inviterIndex = 0;
//   let count = 0;
//   for (const wInvitee of wInvitees) {
//     const inviterWallet = wInviters[inviterIndex];
//     const canInvite = await userContract.canRefer(inviterWallet.address);
//     const isRegistered = await userContract.isRegistered(wInvitee.address);
//     if (isRegistered) {
//       console.log(wInvitee.privateKey, "is registered");
//       continue;
//     }
//     if (canInvite) {
//       const inviteTx = await userContract
//         .connect(inviterWallet)
//         .referUser(wInvitee.address);
//       console.log(
//         `${inviterWallet.address} invited ${wInvitee.address}`,
//         inviteTx.hash
//       );
//       count++;
//       if (count === 5) {
//         inviterIndex++;
//         count = 0;
//       }
//     } else {
//       console.log("Cannot invite", inviterWallet.privateKey);
//       inviterIndex++;
//       count = 0;
//       if (!inviterKeys[inviterIndex]) {
//         return console.log("Out of inviter bound");
//       }
//     }
//   }
// }

// function genPrivateKeys(numberOfWallets) {
//   const pks = [];
//   for (let i = 0; i < numberOfWallets; i++) {
//     const { privateKey } = new ethers.Wallet.createRandom();
//     pks.push(privateKey);
//   }
//   return pks;
// }

// async function splitEth(sender, wallets, amountPerWallet) {
//   const addresses = wallets.map((w) => w.address);
//   const value = new ethers.utils.parseEther(amountPerWallet.toString()).mul(
//     wallets.length
//   );
//   console.log(`Transfer ${amountPerWallet} ETH each to`, addresses);
//   const tx = await splitEthContract.connect(sender).split(addresses, { value });
//   console.log("Sent", tx.hash);
// }

// async function run() {
//   // const numberOfWallets = inviterPrivateKeys.length * 5;
//   // const inviteePks = genPrivateKeys(numberOfWallets);
//   // write(inviteePks, "./pks.json");
//   // console.log("Inviting...", numberOfWallets, "wallets");
//   const senderWallet = new ethers.Wallet(
//     "fa25c762fcf312149117cc3962b06654cf4acab794196778efb5bde691916989",
//     provider
//   );
//   // await splitEth(senderWallet, wallets, "0.07");
//   // console.log("Start game for", numberOfWallets, "wallets");
//   await startGame(wallets);
//   // await invite(inviterWallets, inviteeWallets);
// }

// run();
