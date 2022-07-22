const Web3 = require('web3');
const providerHttp = process.argv[2]
let web3 = new Web3(providerHttp);
module.exports = {
  web3: web3,
  activated: false,
  walletAddress: null,
  privateKey: "",
  aavegotchiContract: null,
  maxGwei: 60,
  borrowParameters : {
    shouldHaveChannel: true,
    nbGotchiWanted: 1,
    time: 12,
    ghstUpfrontCost: "0.4",
    borrower: 70,
    kinship: 300
  }
}
