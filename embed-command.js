const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  Client,
} = require('discord.js');

const { embedPages } = require('../../Handlers/pages.js' OR WHEREVER YOUR FILE IST LOCATED);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Create embed pages')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    const embeds = [
      new EmbedBuilder()
        .setTitle('Page 1')
        .setDescription('This is page 1')
        .setColor('Blue'),

      new EmbedBuilder()
        .setTitle('Page 1')
        .setDescription('This is page 1')
        .setColor('Blue'),
    ];

    await embedPages(client, interaction, embeds);
  },
};
