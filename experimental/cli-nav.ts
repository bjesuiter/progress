import { tty } from '../deps.ts';
import { CLEAR_LINE, ESC } from "../src/types/AnsiEscapeCodes.ts";


// await tty.write(`${ESC}6n`, Deno.stdout);

await tty.goDown(3, Deno.stdout)

await tty.write(`Hello World 1 \n`, Deno.stdout);
await tty.write(`Hello World 2 \n`, Deno.stdout);
await tty.write(`Hello World 3 \n`, Deno.stdout);
await tty.write(`Hello World 4 \n`, Deno.stdout);


const moveDistance = 1;
const msg = `${ESC}${moveDistance}F${ESC}${CLEAR_LINE}HELLO BOB!\n${ESC}${moveDistance - 1}E`;
tty.writeSync(msg, Deno.stdout);