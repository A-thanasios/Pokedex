import { statSync } from "fs";
import { Cache, CacheEntry } from "./pokecache.js";

export class PokeAPI
{
    private static readonly baseURL: string = "https://pokeapi.co/api/v2/";
    #cache: Cache;

    constructor() 
    {
        this.#cache = new Cache(5000);
    }

    async fetchLocations(pageURL: string): Promise<ShallowLocations>
    {
        const lst: string[] = []
        let next = "", previous = ""

        

        try {
            
            if (!pageURL.startsWith(PokeAPI.baseURL))
            {
                pageURL = PokeAPI.baseURL + pageURL;
            }
            
            const cacheVal = this.#cache.get(pageURL)

            if (cacheVal)
            {
                console.log(`Reading: ${pageURL} from memory...\n\n`)
                return cacheVal as ShallowLocations
            }

            const response = await fetch(pageURL);

            if (!response.ok) 
            {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            for (let result of json['results'])
                {
                    lst.push(result['name'])
                }  
            next = json['next']
            previous = json['previous']

        } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                } else {
                    console.error(error);
                }
            }
        
        console.log(`Saving: ${pageURL} to memory...\n\n`)
        this.#cache.add(pageURL, { resultNames: lst, next, previous })

        return { resultNames: lst, next, previous };
        
    }

    async fetchLocation(locationName: string): Promise<Location>
    {
        try {
            const pageURL = PokeAPI.baseURL + "location-area/" + locationName;
            const locationCache = this.#cache.get(pageURL);
            
            if (locationCache)
            {
                return locationCache as Location;
            }

            const response = await fetch(pageURL);
            
            if (!response.ok) 
            {
            throw new Error(`Response status: ${response.status}`);
            }
            
            const json = await response.json();
            const pokemonNames: string[] = []

            for (const pokemon of json["pokemon_encounters"])
            {
                pokemonNames.push(pokemon['pokemon']['name'])
            }

            this.#cache.add(pageURL, { id: json['id'], name: json['location']['name'], pokemons: pokemonNames })

            return { id: json['id'], name: json['location']['name'], pokemonNames }

        } catch (error) {
            console.error(error);
        }

        return {id: -1, name: '', pokemonNames: []}
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon>
    {
        try{
            const pageURL = PokeAPI.baseURL + "/pokemon/" + pokemonName;

            const pokemonCache = this.#cache.get(pageURL);

            if (pokemonCache)
            {
                return pokemonCache as Pokemon;
            }
            
            const response = await fetch(pageURL);

            if (!response.ok) 
            {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            
            const stats: Record<string, number> = {};
            for (let stat of json['stats'])
            {
                const name: string = stat['stat']['name'];
                stats[name] = stat['base_stat'];
            }
            
            const types = [];

            for (let type of json['types'])
            {
                types.push(type['type']['name']);
            }

            this.#cache.add(pageURL, { name: json['name'],
                     baseExp: json['base_experience'],
                     height: json['height'],
                     weight: json['weight'],
                     stats,
                     types
                    });

            return { name: json['name'],
                     baseExp: json['base_experience'],
                     height: json['height'],
                     weight: json['weight'],
                     stats,
                     types
                    };

        } catch(error){
            console.error(error);
        }

        return {name: '', baseExp: -1, height: -1, weight: -1, stats: {}, types: []};
    }
}

export type ShallowLocations = {
    resultNames: string[],
    next: string,
    previous: string,
};

export type Location = {
    id: number,
    name: string,
    pokemonNames: string[],
};

export type Pokemon = {
    name: string,
    baseExp: number,
    height: number,
    weight: number,
    stats: Record<string, number>,
    types: string[],
};