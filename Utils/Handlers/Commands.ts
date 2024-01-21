import ClientCustom from '../../types';
import { promisify } from 'util';
import { glob } from 'glob';

const pGlob = promisify(glob);

export default async (client: ClientCustom) => {
  const cmdFiles = await pGlob(`${process.cwd()}/Commands/*/*.ts`);
  await Promise.all(cmdFiles.map(async (cmdFile) => {
    const { default: cmd } = await import(`${cmdFile}`);
    if (!cmd.name || !cmd.description && cmd.type != 'USER')
      return console.log(`\n⚠ ================\nCommand non chargée: ${!cmd.name ? 'Pas de nom' : 'Pas de description'} \nFichier --> ${cmdFile}\n⚠ ================\n\n`);

    client.commands.set(cmd.name, cmd);
    console.log(`Commande chargée: ${cmd.name}`);
  }));
}
