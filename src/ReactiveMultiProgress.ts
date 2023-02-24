
import { ProgressBarDefinition } from './types/ProgressBarDefinition.ts';

export class ReactiveMultiProgress {

    constructor() {

    }

    public addProgressBar(bar: ProgressBarDefinition) {

        // validate input progress bar defintion
        const validatedBar = ProgressBarDefinition.parse(bar);

        // transform progress stream to progress bar string
        validatedBar.progressStream

    }
}