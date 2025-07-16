import { State } from "./state.js";

import { commandCatch } from "./commandCatch.js";
import { commandExit } from "./commandExit.js";
import { commandExplore } from "./commandExplore.js";
import { commandHelp } from "./commandHelp.js";
import { commandMap } from "./commandMap.js";
import { commandMapb } from "./commandMapb.js";
import { inspect } from "util";
import { commandInspect } from "./commandInspect.js";
import { commandPokedex } from "./commandPokedex.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
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
        map: {
            name: "map next",
            description: "Display the next names of 20 location areas in the Pokemon world",
            callback: commandMap
            },
        mapb: {
            name: "map back",
            description: "Display the previous names of 20 location areas in the Pokemon world",
            callback: commandMapb
        },
        explore: {
            name: "explore",
            description: "Display the pokemons, that can be found in the location area",
            callback: commandExplore
        },
        catch: {
            name: "cath",
            description: "Tries to catch a pokemon by given name",
            callback: commandCatch
        },
        inspect: {
            name: "inspect",
            description: "Gives a detail of caught pokemon",
            callback: commandInspect
        },
        pokedex: {
            name: "pokedex",
            description: "Gives a content of the pokedex",
            callback: commandPokedex
        },

    };
        // Add more commands here as needed
    }