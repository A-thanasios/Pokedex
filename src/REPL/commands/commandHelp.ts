import { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> 
{
    console.log("Welcome to the Pokedex!\nUsage:\n\n")
    let cmd;
    for (const command in state.cmds)
    {
        cmd = state.cmds[command];
        console.log(`${cmd.name}: ${cmd.description}`);
    }
}