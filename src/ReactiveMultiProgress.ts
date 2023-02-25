
import { ProgressBarDefinition } from './types/ProgressBarDefinition.ts';
import { progressToString } from './progressToString.ts';
import { cliRenderTarget } from './cliRenderTarget.ts';
import { signal, tty } from "../deps.ts"
import { simpleCallbackTarget } from "../tests/_testdeps.ts";

export class ReactiveMultiProgress {

    #barDefinitions: ProgressBarDefinition[] = [];

    #barCount = signal(0);

    constructor() {

        // Start output with an empty line
        tty.writeSync('\n', Deno.stdout);

    }

    public addProgressBar(bar: ProgressBarDefinition) {

        tty.writeSync('\n', Deno.stdout);

        // validate input progress bar defintion
        const validatedBar = ProgressBarDefinition.parse(bar);

        const newArrayLength = this.#barDefinitions.push(validatedBar);
        this.#barCount.value = newArrayLength;
        const newLastIndex = newArrayLength - 1;


        // transform progress stream to progress bar string
        return validatedBar.progressStream
            .pipeThrough(progressToString({
                cliRow: newLastIndex,
                completeChar: '=',
                incompleteChar: '-',
                label: bar.label,
                minWidth: 50,
                prettyTimeOn: false,
                templateString: `:bar :text :percent :time :completed/:total`,
                total: 100
            }))
            .pipeTo(
                cliRenderTarget({
                cliOriginRowIndex: newLastIndex,
                totalBarCount: this.#barCount
            })

            // simpleCallbackTarget((chunk) => console.log(chunk) )
            
            )

    }

    public async end() {
        // await tty.goDown(this.#barCount.value + 1);
        await tty.write(' \n', Deno.stdout)
    }
}