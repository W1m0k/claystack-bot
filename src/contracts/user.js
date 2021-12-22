const fetch = require("node-fetch");

async function isEnded(wallet) {
  const info = await fetch(
    `https://app.claystack.com/api/snapshot?address=${wallet.address}`
  ).then((res) => res.json());
  return info.endGame;
}

module.exports = {
  isEnded,
};
