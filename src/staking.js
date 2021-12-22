const { ethers } = require("ethers");
const {
  MATIC_STAKING_CONTRACT,
  finisherWallets,
  maticContract,
  provider,
  rinkebyProvider,
  maticStakingContract,
  grtContract,
  grtStakingContract,
} = require("./constants/config");

async function enable(wallet, tokenContract, stakingContract) {
  const allowance = await tokenContract.allowance(
    wallet.address,
    stakingContract.address
  );
  if (allowance.eq(0)) {
    const stakingContractAddressWithout0x = stakingContract.address
      .slice(2)
      .toLowerCase();
    const tx = await wallet.sendTransaction({
      to: tokenContract.address,
      gasLimit: 500000,
      data: `0x095ea7b3000000000000000000000000${stakingContractAddressWithout0x}ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff`,
    });
    console.log("Enabled", wallet.address, tx.hash);
  } else {
    console.log("Already approved");
  }
}

async function stake(wallet, amount, stakingContract) {
  const uAmount = ethers.utils.parseEther(amount.toString());
  const abiCoder = new ethers.utils.AbiCoder();
  const encodedAmount = abiCoder.encode(["uint256"], [uAmount]).slice(2);
  const tx = await wallet.sendTransaction({
    to: stakingContract.address,
    gasLimit: 500000,
    data: "0xb6b55f25" + encodedAmount,
  });
  console.log(
    "Stake",
    amount,
    stakingContract.address === MATIC_STAKING_CONTRACT ? "Matic" : "GRT",
    tx.hash
  );
}

async function unstake(wallet, amount, stakingContract) {
  const uAmount = ethers.utils.parseEther(amount.toString());
  const abiCoder = new ethers.utils.AbiCoder();
  const encodedAmount = abiCoder.encode(["uint256"], [uAmount]).slice(2);
  const tx = await wallet.sendTransaction({
    to: stakingContract.address,
    gasLimit: 500000,
    data: "0x2e1a7d4d" + encodedAmount,
  });
  console.log(
    "Unstake",
    amount,
    stakingContract.address === MATIC_STAKING_CONTRACT ? "csMatic" : "csGrt",
    tx.hash
  );
}

async function run(_wallet) {
  // For matic
  let wallet = _wallet.connect(provider);
  await enable(wallet, maticContract, maticStakingContract);
  await stake(wallet, 2, maticStakingContract);
  await unstake(wallet, 1, maticStakingContract);

  // For grt
  wallet = _wallet.connect(rinkebyProvider);
  await enable(wallet, grtContract, grtStakingContract);
  await stake(wallet, 2, grtStakingContract);
  await unstake(wallet, 1, grtStakingContract);
}

async function runAll(wallets) {
  let successCount = 0;
  for (const wallet of wallets) {
    await run(wallet);
    successCount++;
  }
  console.log(
    "Successful wallets",
    successCount,
    new Date().toLocaleTimeString()
  );
}

runAll(finisherWallets);
