import { getCommands } from "./commands/CLICommand.js";

export async function startREPL()
{
    const { createInterface } = await import('node:readline');
    const rl = createInterface(
        {
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > "
        }
    );
    rl.prompt();
    rl.on("line", (line) => 
        {
            const lst = cleanInput(line);
            if (lst.length === 0)
            {
                rl.prompt();
            }
            
            const cmds = getCommands();
            for (let string of lst)
            {
                try {
                    if (cmds[string])
                    {
                        cmds[string].callback(cmds);
                    }
                    else
                    {
                        console.log(`Unknown command: ${string}`);
                    }
                } catch (error) {
                    console.error(`Error executing command '${string}':`, error);
                }
            }
            rl.prompt();

        });
}

export function cleanInput(input: string): string[]
{
    let text: string = input.trim()
    text = text.toLowerCase()
    const lst: string[] = text.split(/\s+/)


    return lst
}