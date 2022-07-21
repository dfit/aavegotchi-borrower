const { SlashCommandBuilder } = require('@discordjs/builders');
const configurationManager = require('../../../configurationManager');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('update-nb-gotchi-wanted')
  .setDescription('Update the number of gotchi wanted')
  .addNumberOption(option =>
    option.setName('nbgotchiwanted')
    .setDescription('The number of gotchi you want to borrow')
    .setRequired(true)),
  async execute(interaction) {
    const nbgotchiwanted = interaction.options.getNumber("nbgotchiwanted")
    configurationManager.setNbBorrowWanted(nbgotchiwanted)
    return interaction.reply(`Gotchi wanted updated to ${nbgotchiwanted}`);
  }
};
