import { getCommands } from "./CLICommand.js";

export function commandHelp(): void 
{
    console.log("Welcome to the Pokedex!\nUsage:\n\n")

    for (const command in getCommands())
    {
        const cmd = getCommands()[command];
        console.log(`${cmd.name}: ${cmd.description}`);
    }
}