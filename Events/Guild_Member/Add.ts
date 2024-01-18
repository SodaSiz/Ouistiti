import ClientCustom from '../../types';
import {GuildMember, MessageEmbed, TextChannel} from 'discord.js';
import {channels, embed_var} from '../../Utils/Misc/Settings.json';
import dayjs from 'dayjs';

export default {
  name: 'guildMemberAdd',
  once: false,
  async execute(client: ClientCustom, member: GuildMember) {
    const embed = new MessageEmbed()
      .setTitle(`§ - Nom d'utilisateur: ${member}`)
      .setAuthor({
        name: `${member.user.username} vient de rejoindre (${member.id})`,
        iconURL: member.user.displayAvatarURL()
      })
      .setDescription(
        `・Compte crée le <t:${dayjs(member.user.createdAt).unix()}> (<t:${dayjs(member.user.createdAt).unix()}:R>)
・Rejoint le <t:${dayjs(member.joinedTimestamp).unix()}> (<t:${dayjs(member.joinedTimestamp).unix()}:R>)`
      )
      .setColor(`#${embed_var.color}`)
      .setTimestamp()
      .setFooter({text: 'Encore un nouveau random du web...'})
    const come = client.channels.cache.get(channels.come) as TextChannel;
    if (!come) return
    come.send({embeds: [embed]})
  }
}
