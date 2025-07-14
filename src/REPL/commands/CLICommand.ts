import { commandExit } from "./commandExit.js";
import { commandHelp } from "./commandHelp.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: Record<string, CLICommand>) => void;
};

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit
        },
        help: {
            name: "help",
            description: "Display available commands",
            callback: commandHelp
        },
        // Add more commands here as needed
    };
}