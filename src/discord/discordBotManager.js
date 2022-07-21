const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const configuration = require('../../configuration');
const configurationManager = require('../../configurationManager');
const token = process.env.DISCORD_TOKEN
const guildId = process.env.ID_GUILD
const clientId = process.env.ID_CLIENT
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const idChannelInfo = process.env.ID_CHANNEL_INFO

module.exports = {
  registerBotCommands() {
    const commands = [];
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '9' }).setToken(token);

    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
  },
  registerBotCommandsHandler() {
    client.commands = new Collection();
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      client.commands.set(command.data.name, command);
    }

    client.once('ready', () => {
      console.log('Ready!');
    });

    client.on('interactionCreate', async interaction => {
      if (interaction.isModalSubmit()) {
        this.handleModals(interaction)
      }
      if (!interaction.isCommand()) return;
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
      }
    });
  },
  logInfo(message) {
    console.log(message)
    client.channels.fetch(idChannelInfo).then(channel => channel.send(message));
  },
  async setupDiscordBot() {
    this.registerBotCommands();
    this.registerBotCommandsHandler();
    await client.login(token);
  },
  handleModals(interaction) {
    if(interaction.customId === "update-borrowing-options") {
      const ghstUpfrontCost = interaction.fields.getTextInputValue('ghstUpfrontCost');
      const borrowerShare = interaction.fields.getTextInputValue('borrowerShare');
      const kinship = interaction.fields.getTextInputValue('kinship');
      const lendingDuration = interaction.fields.getTextInputValue('lendingDuration');
      const shouldHaveChanneling = interaction.fields.getTextInputValue('shouldHaveChanneling');
      configurationManager.setBorrowingParameters(shouldHaveChanneling === "true", lendingDuration, ghstUpfrontCost, borrowerShare, kinship)
      return interaction.reply(`Gotchi lending parameters updated with :\n- ghstUpfrontCost: ${ghstUpfrontCost} GHST\n- borrowerShare: ${borrowerShare}%\n- kinship: ${kinship}\n- time: ${lendingDuration} hour(s)\n- shouldHaveChannel: ${shouldHaveChanneling}`);
    }
  }
}
