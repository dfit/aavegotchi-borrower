const fs = require('fs');

module.exports = {
  setNbBorrowWanted(nbGotchiNeeded) {
    const configurationFile = './configuration.js';
    fs.readFile(configurationFile, function(err, data) {
      if(err) throw err;
      data = data.toString();
      data = data.replace(/nbGotchiWanted: .*,/g, `nbGotchiWanted: ${nbGotchiNeeded},`);
      fs.writeFile(configurationFile, data, function(error) {
        if(err) console.log(error)
      });
    });
  }

}
