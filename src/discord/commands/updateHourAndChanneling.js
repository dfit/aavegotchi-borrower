const { SlashCommandBuilder } = require('@discordjs/builders');
const configurationManager = require('../../../configurationManager');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('update-hour-and-channeling')
  .setDescription('Update the number of hour wanted and the channeling available or not')
  .addNumberOption(option =>
    option.setName('nbhour')
    .setDescription('The number of hour you want to borrow the gotchi')
    .setRequired(true))
  .addBooleanOption(option =>
    option.setName('channeling')
    .setDescription('Should the borrow manager look for channeling available ?')
    .setRequired(true)),
  async execute(interaction) {
    const nbhour = interaction.options.getNumber("nbhour")
    const channeling = interaction.options.getBoolean("channeling")
    configurationManager.setHourAndChanneling(nbhour, channeling)
    return interaction.reply(`Hour update to ${nbhour} & channeling needed update to : ${channeling}`);
  }
};
