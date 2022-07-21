const { SlashCommandBuilder } = require('@discordjs/builders');
const configuration = require('../../../configuration');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('user-parameters')
  .setDescription('Get current user parameters'),
  async execute(interaction) {
    let message = `
    Current user parameters are :
- **Nb gotchi wanted** : ${configuration.borrowParameters.nbGotchiWanted} gotchi(s)
- **max upfront cost** : ${configuration.borrowParameters.ghstUpfrontCost} ghst
- **borrower min share** : ${configuration.borrowParameters.borrower} %
- **lending duration** : ${configuration.borrowParameters.time} hour(s)
- **min kinship** : ${configuration.borrowParameters.kinship}
- **should have channeling available ?** : ${configuration.borrowParameters.shouldHaveChannel}
- **lending activated** : ${configuration.activated}
    `
    return interaction.reply(message);
    },
};
