import { ProgressBarString } from './ProgressBarString.ts';
import { CLEAR_LINE, ESC, HIDE_CURSOR } from './AnsiEscapeCodes.ts';
import { tty } from '../../deps.ts';

// function resetScreen() {
//     if (this.#lastRows > 0) {
//       this.stdoutWrite("\x1b[" + (this.#lastRows - 1) + "A\r\x1b[?0J");
//     }
//   }


export function cliRenderTarget({ cliOriginRowIndex, totalBarCount }: { cliOriginRowIndex: number, totalBarCount: number }) {
    let lastRenderString = ''

    return new WritableStream<ProgressBarString>({
        start(_controller) {
            // do init logic, if needed
        },
        write(bar, _controller) {
            // This should throttle the rendering, not sure if needed
            // if (ms < this.interval && end == false) return;

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
                const moveDistance = totalBarCount - bar.cliTargetIndex;
                // ${ESC}${HIDE_CURSOR}
                const renderString = `${ESC}${moveDistance}F${ESC}${CLEAR_LINE}${bar.str}\n${ESC}${moveDistance - 1}E`

                // write to cli 
                tty.writeSync(renderString, Deno.stdout)

                lastRenderString = renderString;
            }

            // TODO: Fix End management
            // if (end) this.end();

        },
        close() {
        },
        abort(reason) {
            console.error("Stream error:", reason);
        },
    });
}