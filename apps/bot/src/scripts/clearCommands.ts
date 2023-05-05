import { setCommands } from "../utils/commands/rest";

const [path, file, guildId, ...args] = process.argv;

console.log(`Clearing 🗑️ commands for ${guildId ?? "global"}...`);
await setCommands({ guildId, body: [] })
console.log(`Cleared commands for ${guildId ?? "global"}`);
