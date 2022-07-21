const { SlashCommandBuilder } = require('@discordjs/builders');
const configuration = require('../../../configuration');
const configurationManager = require('../../../configurationManager');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('activate-auto-borrower')
  .setDescription('Activate auto borrowing'),
  async execute(interaction) {
    configurationManager.setActivateAutoBorrower(true)
    return interaction.reply('Auto-borrower activated !');
  }
};
