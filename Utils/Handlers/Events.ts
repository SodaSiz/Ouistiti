import {Client} from 'discord.js';
import {promisify} from 'util';
import {eventList} from '../Misc/Settings.json';
import {glob} from 'glob';

const pGlob = promisify(glob);

export default async (client: Client) => {
  const eventFiles = await pGlob(`${process.cwd()}/Events/*/*.ts`);
  await Promise.all(eventFiles.map(async (eventFile) => {
    const {default: event} = await import(`${eventFile}`);

    if (!eventList.includes(event.name) || !event.name)
      return console.log(`\n⚠ ================\nÉvenement non chargée: ${event.name ? `\nNom mal écris\nNom entrée: ${event.name}\n` : 'Aucun nom entrée'} \nFichier --> ${eventFile}\n⚠ ================\n\n`);

    if (event.once)
      client.once(event.name, (...args) => event.execute(client, ...args));
    else
      client.on(event.name, (...args) => event.execute(client, ...args));

    console.log(`Évenement chargé: ${event.name}`);
  }));
}
