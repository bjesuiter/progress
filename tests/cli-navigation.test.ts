import { tty } from '../deps.ts';
import { CLEAR_LINE, ESC } from "../src/types/AnsiEscapeCodes.ts";

Deno.test(`Test CLI navigation Skills`, () => {

    tty.writeSync(`Hello World 1 \n`, Deno.stdout);
    tty.writeSync(`Hello World 2 \n`, Deno.stdout);
    tty.writeSync(`Hello World 3 \n`, Deno.stdout);
    tty.writeSync(`Hello World 4 \n`, Deno.stdout);

    const moveDistance = 1;
    const msg = `${ESC}${moveDistance}F${ESC}${CLEAR_LINE}HELLO BOB!\n${ESC}${moveDistance - 1}E`;
    tty.writeSync(msg, Deno.stdout);
})

Deno.test(`interactive navigation`, () => {

    tty.writeSync(`${ESC}6n`, Deno.stdout);

    tty.writeSync(`Hello World 1 \n`, Deno.stdout);
    tty.writeSync(`Hello World 2 \n`, Deno.stdout);
    tty.writeSync(`Hello World 3 \n`, Deno.stdout);
    tty.writeSync(`Hello World 4 \n`, Deno.stdout);


    const moveDistance = 1;
    const msg = `${ESC}${moveDistance}F${ESC}${CLEAR_LINE}HELLO BOB!\n${ESC}${moveDistance - 1}E`;
    tty.writeSync(msg, Deno.stdout);
})