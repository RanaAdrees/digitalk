require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    goerli:{
      url: 'https://eth-goerli.g.alchemy.com/v2/5QcyuLsqTMZoEBlAq0o_vARA9OvVxQ2R',
      accounts: ['08acc607f75c3fad0c6f6cd61e052ceb43d16b489c7817969b12c3b7593e4628']
    },
  },
};
