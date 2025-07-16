import { State } from "./state.js";
import { Pokemon } from "src/interface/pokeApi.js";

export async function commandCatch(state: State, pokemonName: string): Promise<void> 
{
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    const pokemon: Pokemon = await state.api.fetchPokemon(pokemonName);

    const chance = Math.min(1, Math.abs(1 - (pokemon.baseExp / 100)))

    if (Math.random() > chance)
    {
        console.log(`${pokemon.name} was caught!`)
        state.pokedex[pokemon.name] = pokemon;
    }
    else
    {
        console.log(`${pokemon.name} escaped!`)
    }
}