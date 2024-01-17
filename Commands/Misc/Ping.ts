import {Message, CommandInteraction, MessageEmbed} from 'discord.js';
import ClientCustom from '../../types';
import {embed_var} from '../../Utils/Misc/Settings.json';

export default {
  name: 'ping',
  description: 'Affiche la latence du bot.',
  run: (client: ClientCustom, message: Message) => {
    const embed = new MessageEmbed()
      .setTitle('🏓 Pong !')
      .setURL('https://youtu.be/dQw4w9WgXcQ')
      .setColor(`#${embed_var.color}`)
      .setThumbnail(client.user?.displayAvatarURL() as string)
      .addFields({
        name: 'Latence',
        value: `\`${client.ws.ping}\``,
        inline: true
      },
        {
          name: 'Latence',
          value: `<t:${client.readyTimestamp ? Math.floor(client.readyTimestamp / 1000) : ''}>`,
          inline: true
        })
      .setTimestamp()
      .setFooter({text: message.author.username, iconURL: message.author.displayAvatarURL()});

    message.reply({embeds: [embed]})
  },
  runSlash: (client: ClientCustom, interaction: CommandInteraction) => {
    const embed = new MessageEmbed()
      .setTitle('🏓 Pong !')
      .setURL('https://youtu.be/dQw4w9WgXcQ')
      .setColor(`#${embed_var.color}`)
      .setThumbnail(client.user?.displayAvatarURL() as string)
      .addFields({
        name: 'Latence',
        value: `\`${client.ws.ping}\``,
        inline: true
      }, {
        name: 'Latence',
        value: `<t:${client.readyTimestamp ? Math.floor(client.readyTimestamp / 1000) : ''}>`,
        inline: true
      })
      .setTimestamp()
      .setFooter({text: interaction.user.username, iconURL: interaction.user.displayAvatarURL()});
    interaction.reply({embeds: [embed]})
  }
}
