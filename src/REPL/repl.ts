import { getCommands } from "./commands/CLICommand.js";
import { State } from "./commands/state.js";

export function startREPL(state: State): void
{
    state.rl.prompt();
    state.rl.on("line", async (line) => 
        {
            const lst = cleanInput(line);
            if (lst.length === 0)
            {
                state.rl.prompt();
            }
            
            
                try {
                    if (state.cmds[lst[0]])
                    {
                        await state.cmds[lst[0]].callback(state, lst[1]);
                    }
                    else
                    {
                        console.log(`Unknown command: ${lst[0]}`);
                    }
                } catch (error) {
                    console.error(`Error executing command '${lst[0]}':`, error);
                }
            
            state.rl.prompt();
        });
}

export function cleanInput(input: string): string[]
{
    let text: string = input.trim()
    text = text.toLowerCase()
    const lst: string[] = text.split(/\s+/)


    return lst
}