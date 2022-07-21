const borrowManager = require('./borrowManager');
const configuration = require('../configuration');
const configurationManager = require('../configurationManager');
module.exports = {
  async routineCheck() {
    if(configuration.borrowParameters.nbGotchiWanted > 0) {
      const availablesGotchisListing = await borrowManager.getAvailableGotchis()
      if(availablesGotchisListing.length !== 0) {
        for (const gotchiListing of availablesGotchisListing.slice(0, configuration.borrowParameters.nbGotchiWanted)) {
          await borrowManager.borrowGotchi(gotchiListing)
        }
      } else {
        console.log("No gotchis found with current parameters.")
      }
    } else {
      configurationManager.setNbBorrowWanted(configuration.borrowParameters.nbGotchiWanted)
    }
  }
}
