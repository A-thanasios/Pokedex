import { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> 
{
    console.log("Your pokedex:")

    if (Object.keys(state.pokedex).length === 0)
    {
        console.log("  I am so empty! Go catch some Pokémon!")
    }

    for (const pokemon of Object.keys(state.pokedex))
    {
        console.log(` - ${pokemon}`);
    }
}