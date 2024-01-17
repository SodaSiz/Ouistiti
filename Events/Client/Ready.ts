import ClientCustom from '../../types';
import 'dotenv/config';

export default {
  name: 'ready',
  execute(client: ClientCustom) {
    console.log('Hackerman')

    const DEV_GUILD = client.guilds.cache.get(process.env.DEV_GUILD_ID as string);

    if (DEV_GUILD) DEV_GUILD.commands.set(client.commands.map(cmd => cmd));

    else console.error('DEV_GUILD est undefined')

  }
}
