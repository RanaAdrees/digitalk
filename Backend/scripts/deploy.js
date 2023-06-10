// https://eth-goerli.g.alchemy.com/v2/5QcyuLsqTMZoEBlAq0o_vARA9OvVxQ2R

// deploy to 0x9649086De31E21094e95ffa37B4A56437031e8dE
const hre = require("hardhat");

const main = async () => {
  const DigiTalk = await hre.ethers.getContractFactory("DigiTalk");

  const digitalk = await DigiTalk.deploy();

  await digitalk.deployed();

  console.log(`DigiTalk is deployed to ${digitalk.address}`);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

runMain();

//  Latest DigiTalk is deployed to 0x98b60C545Eb66126F1751189170ca42602096a62

// previous with missing DigiTalk is deployed to 0x804A686Ce0083c17D8e23e60B54Bfd054Ce378B1
