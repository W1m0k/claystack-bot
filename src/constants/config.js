const { ethers } = require("ethers");

const CLAYSTACK_GAME_CONTRACT = "0x7b067b776deC24CF0c2390e76Dea20217e75D9F7";
const CLAYSTACK_INVITE_CONTRACT = "0xf1869edab2c3ab3461f2a2bc521a016c75e90553";
const MATIC_STAKING_CONTRACT = "0xE29d3d4d72997b31Ccdf8188113c189f1106f6b8";
const MATIC_STAKE_MANAGER_CONTRACT =
  "0x00200eA4Ee292E253E6Ca07dBA5EdC07c8Aa37A3";
const MULTICALL_CONTRACT = "0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e";
const FAUCET_CONTRACT = "0x11fe0b9b1a408f5d790c6ea5666ee6f31306408f";
const GRT_CONTRACT = "0x54fe55d5d255b8460fb3bc52d5d676f9ae5697cd";
const GRT_FAUCET_CONTRACT = "0x83B7cF23b047Df8b0c69649df43362631cbbEDbF";
const GRT_STAKING_CONTRACT = "0x880c80c6739c05f9ddb8bc2597b65d1ec9b92c10";
const MATIC_CONTRACT = "0x499d11e0b6eac7c0593d8fb292dcbbf815fb29ae";
const SPLIT_ETH_CONTRACT = "0x61ecc869e1efcfb9f2c3d226357544a2ebae1188";
const GOERLI_RPC_URL =
  "https://goerli.infura.io/v3/510b6d5b3c56497b8070626a54f565a9";
const RINKEBY_RPC_URL =
  "https://rinkeby.infura.io/v3/510b6d5b3c56497b8070626a54f565a9";
const CLAIM_COOLDOWN = 60 * 60 * 12;
const CLAIM_COOLDOWN_MATIC = 80;

const gameAbi = require("../abi/game.json");
const userAbi = require("../abi/user.json");
const erc20Abi = require("../abi/erc20.json");
const splitEthAbi = require("../abi/spliteth.json");
const multicallAbi = require("../abi/multicall.json");
const maticFaucetAbi = require("../abi/maticfaucet.json");
const claimV2Abi = require("../abi/claimv2.json");
const goerliProvider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
const rinkebyProvider = new ethers.providers.JsonRpcProvider(RINKEBY_RPC_URL);
const finisherPks = require("../../credentials/finish.json");
const SLOTS = parseInt(process.env.SLOTS) || 1;
const TASK_SLOT = parseInt(process.env.TASK_SLOT) || 0;

const finisherWallets = finisherPks
  .filter((_pk, index) => {
    return index % SLOTS === TASK_SLOT - 1;
  })
  .map((pk) => new ethers.Wallet(pk, goerliProvider));
const tokens = [
  {
    symbol: "MELV",
    name: "Melville ClayStack Game",
    address: "0xf66bA729ce62F97DaD71BfFAe842925Ba629F741",
  },
  {
    symbol: "TANA",
    name: "Tana ClayStack Game",
    address: "0x335E2D611384193af84bfe949971EaFCea5a7DE1",
  },
  {
    symbol: "PEIP",
    name: "Peipus ClayStack Game",
    address: "0xfd769a11a1ab3bdfd6Fad3C9E20BA2Ce322F8Ae1",
  },
  {
    symbol: "SAIM",
    name: "Saimaa ClayStack Game",
    address: "0x3E3A5efDc4AbA0D92D0A2F52d107E2D45DB6670a",
  },
  {
    symbol: "TYMR",
    name: "Taymyr ClayStack Game",
    address: "0x013AADF384f67869aF3DE4e18d788D3ff3126238",
  },
  {
    symbol: "MANI",
    name: "Manitoba ClayStack Game",
    address: "0xcc17c2DA3dC8e480BD070740981D0B561FA39103",
  },
  {
    symbol: "MERU",
    name: "Mewru ClayStack Game",
    address: "0x3557042e5F74B85e6B807192A37e773f9d4be082",
  },
  {
    symbol: "ALBT",
    name: "Albert ClayStack Game",
    address: "0x4fe9670ed85AC6BeaDC0cE1dec131F1e86E717C0",
  },
  {
    symbol: "URNI",
    name: "Urnia ClayStack Game",
    address: "0xC2c2fc434F2ab8D7eae92374dBc2F8E6cCf10EAb",
  },
  {
    symbol: "TURK",
    name: "Turkana ClayStack Game",
    address: "0xDd0895b6c6E50A2bf0625f1e2cD36cfabbd52a93",
  },
  {
    symbol: "NICA",
    name: "Nicaragua ClayStack Game",
    address: "0x786D9A54a0437C2D3bDb44eE6cF57dfFf6484131",
  },
  {
    symbol: "ONEG",
    name: "Onega ClayStack Game",
    address: "0x1167788F415A162e6016936F458FD92C32823630",
  },
  {
    symbol: "VSTK",
    name: "Vostok ClayStack Game",
    address: "0xe43cFea1F09b863D8061F792dc50e904903696cF",
  },
  {
    symbol: "BALK",
    name: "Balkhash ClayStack Game",
    address: "0x85f0cA0045a96aBdE82363f9bA8426061FeFd84C",
  },
  {
    symbol: "ONTR",
    name: "Ontario ClayStack Game",
    address: "0xE9C754207f2fB01DeBF8a1b3Aa9F45C4aeB79637",
  },
  {
    symbol: "ERIE",
    name: "Erie ClayStack Game",
    address: "0xfC4B76B567A9a17Cefd1D960C3478b16d9623f2a",
  },
  {
    symbol: "MLWI",
    name: "Malawi ClayStack Game",
    address: "0x41A1b53DF60920Cb4Ca6beB6c1ACc8D914F47067",
  },
  {
    symbol: "BAIK",
    name: "Baikal ClayStack Game",
    address: "0x0617A90edF7F8412133C839cbDe409aAC589280C",
  },
];
module.exports = {
  gameContract: new ethers.Contract(
    CLAYSTACK_GAME_CONTRACT,
    gameAbi,
    goerliProvider
  ),
  userContract: new ethers.Contract(
    CLAYSTACK_INVITE_CONTRACT,
    userAbi,
    goerliProvider
  ),
  multicallContract: new ethers.Contract(
    MULTICALL_CONTRACT,
    multicallAbi,
    goerliProvider
  ),
  splitEthContract: new ethers.Contract(
    SPLIT_ETH_CONTRACT,
    splitEthAbi,
    goerliProvider
  ),
  maticContract: new ethers.Contract(MATIC_CONTRACT, erc20Abi, goerliProvider),
  grtContract: new ethers.Contract(GRT_CONTRACT, erc20Abi, rinkebyProvider),
  maticFaucetContract: new ethers.Contract(
    FAUCET_CONTRACT,
    maticFaucetAbi,
    goerliProvider
  ),
  maticStakingContract: new ethers.Contract(
    MATIC_STAKING_CONTRACT,
    claimV2Abi,
    goerliProvider
  ),
  grtStakingContract: new ethers.Contract(
    GRT_STAKING_CONTRACT,
    claimV2Abi,
    rinkebyProvider
  ),
  erc20Abi,
  gameAbi,
  provider: goerliProvider,
  rinkebyProvider: rinkebyProvider,
  finisherWallets,
  tokens,
  FAUCET_CONTRACT,
  GRT_FAUCET_CONTRACT,
  MATIC_STAKING_CONTRACT,
  MATIC_STAKE_MANAGER_CONTRACT,
  MATIC_CONTRACT,
  CLAIM_COOLDOWN,
  CLAIM_COOLDOWN_MATIC,
};
