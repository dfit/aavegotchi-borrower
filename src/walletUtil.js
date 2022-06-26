const configuration = require('../configuration');
const MAX_GWEI = configuration.maxGwei;
module.exports = {
  getWalletAddress() {
    let account = configuration.web3.eth.accounts.privateKeyToAccount(configuration.privateKey);
    console.log(`Public address : ${account.address}`)
    return account.address;
  },
  async sendWithPrivateKey(transaction, callback, parameter) {
  const account = configuration.web3.eth.accounts.privateKeyToAccount(configuration.privateKey).address;
  const estimateGas = await configuration.web3.eth.getGasPrice();
  const options = {
    to: transaction._parent._address,
    data: transaction.encodeABI(),
    gas: await transaction.estimateGas({from: account}),
    maxFeePerGas: estimateGas < configuration.web3.utils.toWei(MAX_GWEI, "Gwei") ? estimateGas : configuration.web3.utils.toWei(MAX_GWEI, "Gwei"),
    maxPriorityFeePerGas: estimateGas < configuration.web3.utils.toWei(MAX_GWEI, "Gwei") ? estimateGas : configuration.web3.utils.toWei(MAX_GWEI, "Gwei"),
    type: 0x2
  };
  const signed  = await configuration.web3.eth.accounts.signTransaction(options, configuration.privateKey);
  configuration.web3.eth.sendSignedTransaction(signed.rawTransaction)
  .on('transactionHash',async (hash) => {
    console.log(`txHash: ${JSON.stringify(hash)}`)
    if (callback != null && parameter != null) {
      await callback(parameter);
    }
  })
  .on('receipt',(receipt) => {
    console.log(`receipt: ${JSON.stringify(receipt)}`)
  })
  .on('error', (error => {
    console.error(`error: ${JSON.stringify(error)}`)
  }));
}
}
