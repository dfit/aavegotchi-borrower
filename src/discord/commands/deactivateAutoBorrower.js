const { SlashCommandBuilder } = require('@discordjs/builders');
const configuration = require('../../../configuration');
const configurationManager = require('../../../configurationManager');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('deactivate-auto-borrower')
  .setDescription('Deactivate auto borrowing'),
  async execute(interaction) {
    configurationManager.setActivateAutoBorrower(false)
    return interaction.reply('Auto-borrower deactivated !');
  }
};
