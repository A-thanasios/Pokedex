import { ShallowLocations } from "src/interface/pokeApi.js";
import { State } from "./state.js";

export async function commandMapb(state: State): Promise<void>
{
    
    if (state.prevLocationsURL) 
    {
        const locations: ShallowLocations = await state.api.fetchLocations(state.prevLocationsURL);
        state.nextLocationsURL = locations.next;
        state.prevLocationsURL = locations.previous;
        
        for (const name of locations.resultNames)
        {
            console.log(name);
        }
    }
    else
    {
        console.log("You are on the first page!");
    }
}