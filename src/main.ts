import { initState } from "./REPL/commands/state.js";
import { startREPL } from "./REPL/repl.js";

function main()
{
    const state = initState();
    startREPL(state);
}

main();