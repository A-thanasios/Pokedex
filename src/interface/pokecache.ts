export class Cache 
{
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) 
    {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T): void
    {
        this.#cache.set(key, { createdAt: Date.now(), val});
    }

    get<T>(key:string): T
    {
        return this.#cache.get(key)?.val as T;
    }

    stopReapLoop():void
    {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }

    #startReapLoop(): void
    {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    #reap(): void
    {
        const deleteThreshold: number = Date.now() - this.#interval;
                
        
        for (const pair of this.#cache)
        {

            if (pair[1].createdAt <= deleteThreshold)
            {
                this.#cache.delete(pair[0]);
            }
        }
    }
}

export type CacheEntry<T> = {
    createdAt: number,
    val: T,
};