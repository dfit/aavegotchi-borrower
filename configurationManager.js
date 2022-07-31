const fs = require('fs');
const configuration = require('./configuration');

module.exports = {
  setNbBorrowWanted(nbGotchiNeeded) {
    const configurationFile = './configuration.js';
    configuration.borrowParameters.nbGotchiWanted = nbGotchiNeeded
    fs.readFile(configurationFile, function(err, data) {
      if(err) throw err;
      data = data.toString();
      data = data.replace(/nbGotchiWanted: .*,/g, `nbGotchiWanted: ${nbGotchiNeeded},`);
      fs.writeFile(configurationFile, data, function(error) {
        if(err) console.log(error)
      });
    });
  },
  setHourAndChanneling(hours, channeling) {
    const configurationFile = './configuration.js';
    configuration.borrowParameters.time = hours
    configuration.borrowParameters.shouldHaveChannel = channeling
    fs.readFile(configurationFile, function(err, data) {
      if(err) throw err;
      data = data.toString();
      data = data.replace(/time: .*,/g, `time: ${hours},`);
      data = data.replace(/shouldHaveChannel: .*,/g, `shouldHaveChannel: ${channeling},`);
      fs.writeFile(configurationFile, data, function(error) {
        if(err) console.log(error)
      });
    });
  },
  setBorrowingParameters(shouldHaveChannel, time, ghstUpfrontCost, borrower, kinship) {
    const configurationFile = './configuration.js';
    configuration.borrowParameters.shouldHaveChannel = shouldHaveChannel
    configuration.borrowParameters.time = time
    configuration.borrowParameters.ghstUpfrontCost = ghstUpfrontCost
    configuration.borrowParameters.borrower = borrower
    configuration.borrowParameters.kinship = kinship
    fs.readFile(configurationFile, function(err, data) {
      if(err) throw err;
      data = data.toString();
      data = data.replace(/shouldHaveChannel: .*,/g, `shouldHaveChannel: ${shouldHaveChannel},`);
      data = data.replace(/time: .*,/g, `time: ${time},`);
      data = data.replace(/ghstUpfrontCost: ".*",/g, `ghstUpfrontCost: "${ghstUpfrontCost}",`);
      data = data.replace(/borrower: .*,/g, `borrower: ${borrower},`);
      data = data.replace(/kinship: .*/g, `kinship: ${kinship}`);
      fs.writeFile(configurationFile, data, function(error) {
        if(err) console.log(error)
      });
    });
  },
  setActivateAutoBorrower(activated) {
    const configurationFile = './configuration.js';
    configuration.activated = activated
    fs.readFile(configurationFile, function(err, data) {
      if(err) throw err;
      data = data.toString();
      data = data.replace(/activated: .*,/g, `activated: ${activated},`);
      fs.writeFile(configurationFile, data, function(error) {
        if(err) console.log(error)
      });
    });
  }

}
