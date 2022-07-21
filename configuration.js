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
    ghstUpfrontCost: "0.2",
    borrower: 60,
    kinship: 300
  }
}
