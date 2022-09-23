const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require('discord.js');

module.exports = {
  client.embedPages: async (interaction, embeds) => {
    const pages = {};
    const getRow = (id) => {
      //-------------- Create the action row with buttons --------------
      const row = new ActionRowBuilder();
      
      return new ActionRowBuilder().addComponents(
      new ButtonBuilder()
          .setLabel('◀')
          .setCustomId('prev_embed')
          .setStyle(ButtonStyle.Primary)
          .setDisabled(pages[id] === 0),
      new ButtonBuilder()
          .setLabel('▶')
          .setCustomId('next_embed')
          .setStyle(ButtonStyle.Primary)
          .setDisabled(pages[id] === embeds.length - 1)
        
      // -------------- Any other custom Button (if needed) --------------
      //new ButtonBuilder()
      //  .setLabel('Your label')
      //  .setCustomId('your_custom_id')
      //  .setStyle(ButtonStyle.Primary)
      //  .setDisabled(pages[id] === embeds.length - 1)
      // -------------- Any other custom Button (if needed) --------------

      );
      
      //-------------- Create the action row with buttons --------------
    };

    const id = interaction.user.id;
    pages[id] = pages[id] || 0;
    let Pagemax = embeds.length;

    const embed = embeds[pages[id]];

    await embeds[pages[id]].setFooter({
      text: `Page ${pages[id] + 1} from ${Pagemax}`,
    });

    const replyEmbed = await interaction.reply({
      embeds: [embed],
      components: [getRow(id)],
      ephemeral: true,
      fetchReply: true,
    });

    const filter = (i) => i.user.id === interaction.user.id;
    const time = 1000 * 60 * 5;

    const collector = await replyEmbed.createMessageComponentCollector({
      filter,
      time,
    });

    collector.on('collect', async (b) => {
      if (!b) return;
      if (b.customId !== 'prev_embed' && b.customId !== 'next_embed') return;

      b.deferUpdate();

      if (b.customId === 'prev_embed' && pages[id] > 0) {
        --pages[id];
      } else if (b.customId === 'next_embed' && pages[id] < embeds.length - 1) {
        ++pages[id];
      }

      await embeds[pages[id]].setFooter({
        text: `Page ${pages[id] + 1} of ${Pagemax}`,
      });

      await interaction.editReply({
        embeds: [embeds[pages[id]]],
        components: [getRow(id)],
        ephemeral: true,
        fetchReply: true,
      });
    });

    // -------------- Not needed but cool to have --------------
    collector.on('end', async (reason) => {
      if (reason === 'time') {
        const warningEmbed = new EmbedBuilder()
          .setColor('Yellow')
          .setDescription(`⚠️ |  Unfortunately, the embed has expired!`);

        await interaction.editReply({
          embeds: [warningEmbed],
          components: [],
          ephemeral: true,
        });
      }
    });
    // -------------- Not needed but cool to have --------------
  },
};
