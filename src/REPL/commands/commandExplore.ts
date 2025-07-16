import { State } from "./state.js";
import { Location } from "src/interface/pokeApi.js";

export async function commandExplore(state: State, locationName: string): Promise<void> 
{
    console.log(`Exploring ${locationName}...\nFound Pokemon:`);
    const location: Location = await state.api.fetchLocation(locationName);
    for (const pokemonName of location.pokemonNames)
    {
        console.log(`- ${pokemonName}`);
    }

}