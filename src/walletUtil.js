const configuration = require('../configuration');
const MAX_GWEI = configuration.maxGwei;
module.exports = {
  getWalletAddress() {
    let account = configuration.web3.eth.accounts.privateKeyToAccount(configuration.privateKey);
    console.log(`Public address : ${account.address}`)
    return account.address;
  },
  async sendWithPrivateKey(transaction, callbackSuccess, callbackFailed, parameter) {
    const account = configuration.web3.eth.accounts.privateKeyToAccount(configuration.privateKey).address;
    const estimateGas = await configuration.web3.eth.getGasPrice();
    const maxPriorityFeePerGas = configuration.web3.utils.toWei((10 + Number(configuration.web3.utils.fromWei(estimateGas,"Gwei"))) +"", "Gwei")
    const options = {
      chainId: 0x89,
      to: transaction._parent._address,
      data: transaction.encodeABI(),
      gas: await transaction.estimateGas({from: account}),
      maxFeePerGas: configuration.web3.utils.toWei(MAX_GWEI, "Gwei"),
      maxPriorityFeePerGas: Number(maxPriorityFeePerGas) < Number(configuration.web3.utils.toWei(MAX_GWEI, "Gwei")) ? maxPriorityFeePerGas : configuration.web3.utils.toWei(MAX_GWEI, "Gwei"),
      type: 0x2
    };
    const signed  = await configuration.web3.eth.accounts.signTransaction(options, configuration.privateKey);
    configuration.web3.eth.sendSignedTransaction(signed.rawTransaction)
    .on('transactionHash',async (hash) => {
      console.log(`txHash: ${JSON.stringify(hash)}`)
      if (callbackSuccess != null && parameter != null) {
        await callbackSuccess(parameter);
      }
    })
    .on('receipt',(receipt) => {
      console.log(`receipt: ${JSON.stringify(receipt)}`)
    })
    .on('error', (async error => {
      console.error(`error: ${JSON.stringify(error)}`)
      if (callbackFailed != null && parameter != null) {
        await callbackFailed(parameter);
      }
    }));
  }
}
