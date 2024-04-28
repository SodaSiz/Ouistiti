import ClientCustom from '../../types';
import {GuildMember, MessageEmbed, TextChannel} from 'discord.js';
import {channels} from '../../Utils/Misc/Settings.json';
import dayjs from 'dayjs';

export default {
  name: 'guildMemberRemove',
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
・Parti le <t:${dayjs().unix()}> (<t:${dayjs().unix()}:R>)`
      )
      .setColor('#FF0000')
      .setTimestamp()
      .setFooter({text: channels.leave.text})
  const leave = client.channels.cache.get(channels.leave.id) as TextChannel;
    if (!leave) return;
    leave.send({embeds: [embed]})
  }
}
