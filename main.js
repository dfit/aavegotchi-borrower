require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss.l');
const configuration = require('./configuration');
const diamondcontract = require('./data/diamondcontract');
const walletUtil = require('./src/walletUtil');
const naiveAlgo = require('./src/naiveAlgo');

const TIME_BETWEEN_ITERATION = 7000;

async function setup() {
  configuration.privateKey = process.env.PRIVATE_KEY
  configuration.walletAddress = walletUtil.getWalletAddress()
  configuration.aavegotchiContract = new configuration.web3.eth.Contract(diamondcontract.abi, diamondcontract.smartContractAddress);
}

async function main() {
  await naiveAlgo.routineCheck()
  setTimeout(() => {
    main()
  }, TIME_BETWEEN_ITERATION)
}
setup().then(() => main());

