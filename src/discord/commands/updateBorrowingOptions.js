const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, MessageActionRow } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('update-borrowing-options')
  .setDescription('Change all gotchis borrowing parameters'),
  async execute(interaction) {
    const modal = new Modal()
    .setCustomId('update-borrowing-options')
    .setTitle('Change all gotchis lending parameters');
    const ghstUpfrontCost = new TextInputComponent()
    .setCustomId('ghstUpfrontCost')
    .setLabel("How much GHST upfront cost max?")
    .setStyle('SHORT');
    const borrower = new TextInputComponent()
    .setCustomId('borrowerShare')
    .setLabel("How min % for borrower ?")
    .setStyle('SHORT');
    const kinship = new TextInputComponent()
    .setCustomId('kinship')
    .setLabel("How much kinship min?")
    .setStyle('SHORT');
    const lendingDuration = new TextInputComponent()
    .setCustomId('lendingDuration')
    .setLabel("How min hours ?")
    .setStyle('SHORT');
    const shouldHaveChanneling = new TextInputComponent()
    .setCustomId('shouldHaveChanneling')
    .setLabel("Should have channeling ? (true / false)")
    .setStyle('SHORT');

    const firstActionRow = new MessageActionRow().addComponents(ghstUpfrontCost);
    const secondActionRow = new MessageActionRow().addComponents(borrower);
    const thirdActionRow = new MessageActionRow().addComponents(kinship);
    const fourthActionRow = new MessageActionRow().addComponents(lendingDuration);
    const fifthActions = new MessageActionRow().addComponents(shouldHaveChanneling);
    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActions);
    await interaction.showModal(modal);
  },
};
