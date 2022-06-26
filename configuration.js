const Web3 = require('web3');
const providerHttp = process.argv[2]
let web3 = new Web3(providerHttp);
module.exports = {
  web3: web3,
  walletAddress: null,
  privateKey: "",
  aavegotchiContract: null,
  maxGwei: 80,
  borrowParameters : {
    shouldHaveChannel: false,
    nbGotchiWanted: 0,
    time: 1, //hours
    ghstUpfrontCost: "0.1",
    borrower: 0,
    kinship: 0
  }
}
