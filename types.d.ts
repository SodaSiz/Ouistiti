declare namespace NodeJS {
  interface ProcessEnv {
    TOKEN?: string;
    GUILD_ID?: string;
    DEV_GUILD_ID?: string;
    CLIENT_ID?: string;
    // add more environment variables and their types here
  }
}

// types.d.ts

import {Client, Collection} from 'discord.js';

interface ClientCustom extends Client {
  commands: Collection<string, any>; // Adjust the type accordingly
}

export default ClientCustom;
