import { State } from "./state.js";
import { Pokemon } from "src/interface/pokeApi.js";

export async function commandInspect(state: State, pokemonName: string): Promise<void> 
{
    const pokemon = state.pokedex[pokemonName]

    if (pokemon)
    {
        console.log(`Name: ${pokemon.name}`)
        console.log(`Height: ${pokemon.height}`)
        console.log(`Weight: ${pokemon.weight}`)
        console.log(`Stats:`)
        for (let stat of Object.keys(pokemon.stats))
        {
            console.log(`  - ${stat}: ${pokemon.stats[stat]}`)
        }
        console.log(`Types:`)
        for(let type of pokemon.types)
        {
            console.log(`  - ${type}`)
        }
    }
    else
    {
        console.log(`You didn't caught ${pokemonName} yet`)
    }
}