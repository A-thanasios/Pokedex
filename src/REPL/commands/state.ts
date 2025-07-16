import { createInterface, type Interface } from "readline";
import { CLICommand, getCommands } from "./CLICommand.js";
import { PokeAPI, Pokemon } from "../../interface/pokeApi.js";
import { stringify } from "querystring";

export type State = {
    rl: Interface,
    cmds: Record<string, CLICommand>,
    api: PokeAPI,
    pokedex: Record<string, Pokemon>,
    nextLocationsURL: string,
    prevLocationsURL: string,
};

export function initState(): State
{
    const rl = createInterface(
        {
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > "
        }
    );

    const cmds = getCommands();
    const api = new PokeAPI;
    const pokedex = {}

    return { rl, cmds, api, pokedex, nextLocationsURL: "", prevLocationsURL: "" };
}