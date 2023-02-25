import { ProgressBarString } from './types/ProgressBarString.ts';
import { CLEAR_LINE, ESC, HIDE_CURSOR } from './types/AnsiEscapeCodes.ts';
import { Signal, tty } from '../deps.ts';
import { AnsiCommand } from './utils/AnsiCommand.ts';

// function resetScreen() {
//     if (this.#lastRows > 0) {
//       this.stdoutWrite("\x1b[" + (this.#lastRows - 1) + "A\r\x1b[?0J");
//     }
//   }


export function cliRenderTarget({ cliOriginRowIndex, totalBarCount }: { cliOriginRowIndex: number, totalBarCount: Signal<number> }) {
    let lastRenderString = '';
    let lastRenderTime = 0;
    let lastBar: ProgressBarString;

    let allWriteCounts = 0;
    let blockedWrites = 0;
    let msBetweenWrites

    return new WritableStream<ProgressBarString>({
        start(_controller) {
            // do init logic, if needed
        },
        async write(bar, _controller) {
            // This should throttle the rendering
            const ms = Date.now() - lastRenderTime
            const maxRenderFrequency = 16;

            allWriteCounts += 1;

            if (!bar.end && ms < maxRenderFrequency) {
                blockedWrites += 1;
                return;
            }

            // render this stream to the right position in the cli
            // origin should be one line after all the progress bars 

            if (bar.str !== lastRenderString) {
                // resetScreen();

                /**
                 * Example position calculation 
                 * Total: 4 Bars (Index 0 - 3)
                 * cliOriginRowIndex = 40 
                 * bar.cliTargetIndex = 2 (vorletzte)
                 * moveDistance = totalBarCount (4) - bar.cliTargetIndex (2) = 2
                 * => bc. our cursor origin is AFTER the last bar => we need to go one up higher
                 * 
                 * Notes: 
                 * nF => move n previous lines 
                 */
                // ${ESC}${HIDE_CURSOR}
                // const moveDistance = totalBarCount.value - bar.cliTargetIndex;
                // const renderString = `${ESC}${moveDistance}F${ESC}${CLEAR_LINE}${bar.str}\n${ESC}${moveDistance - 1}E`

                // Forwards logic: Start is top left corner, addressing from there on 
                const moveDistance = totalBarCount.value - bar.cliTargetIndex;

                const msg = `${bar.str} * ${allWriteCounts} * ${blockedWrites}`

                const cmd = new AnsiCommand();

                cmd
                    .saveCursor()
                    .moveLinesUp(moveDistance)
                    // .clearLine()
                    .plainText(msg)
                    .restoreCursor();


                // const renderString = `${ESC}${moveDistance}E${ESC}${CLEAR_LINE}${bar.str}${ESC}${moveDistance + 2}F`
                const renderString = cmd.getCommandString();

                // write to cli 
                await tty.write(renderString, Deno.stdout)

                // console.log(totalBarCount.value)

                lastRenderString = renderString;
                lastBar = bar;
            }

            // TODO: Fix End management
            // if (end) this.end();

        },
        async close() {

            const moveDistance = totalBarCount.value - lastBar.cliTargetIndex;
            const renderString = `${ESC}s${ESC}${moveDistance}F${ESC}${CLEAR_LINE}${lastBar.str} * Stream finished! * ${ESC}u`

            // await tty.write(renderString, Deno.stdout)
            // console.log('Bob')
        },
        abort(reason) {
            console.error("Stream error:", reason);
        },
    });
}