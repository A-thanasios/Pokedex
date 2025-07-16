import { ShallowLocations } from "src/interface/pokeApi.js";
import { State } from "./state.js";

export async function commandMap(state: State): Promise<void>
{
    if (!state.nextLocationsURL)
    {
        state.nextLocationsURL = "location-area/"
    }
    const locations: ShallowLocations = await state.api.fetchLocations(state.nextLocationsURL);
    
    if (locations.next) 
    {
        state.nextLocationsURL = locations.next;
        state.prevLocationsURL = locations.previous;
        
        for (const name of locations.resultNames)
        {
            console.log(name);
        }
    }
    else
    {
        console.log("You are on the last page!");
    }
}