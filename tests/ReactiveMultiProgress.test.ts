
import { ReactiveMultiProgress } from '../src/ReactiveMultiProgress.ts';
import { tty } from "../deps.ts"

import {
    map,
    timerSource,
} from "./_testdeps.ts";


Deno.test(`Test`, async () => {

    const instance = new ReactiveMultiProgress();

    // tty.clearScreenSync();
    // tty.goHomeSync();

    const promise1 = instance.addProgressBar({
        label: 'Timer 1',
        total: 25,
        progressStream: timerSource({ maxEventCount: 400, intervalInMilliseconds: 25 }).pipeThrough(map(count => count / 4))
    })

    const promise2 = instance.addProgressBar({
        label: 'Timer 2',
        total: 100,
        progressStream: timerSource({ maxEventCount: 100, intervalInMilliseconds: 100 })
    })

    const promise3 = instance.addProgressBar({
        label: 'Timer 3',
        total: 100,
        progressStream: timerSource({ maxEventCount: 100, intervalInMilliseconds: 100 })
    })

    const promise4 = instance.addProgressBar({
        label: 'Timer 4',
        total: 100,
        progressStream: timerSource({ maxEventCount: 100, intervalInMilliseconds: 100 })
    })

    await Promise.all([promise1, promise2, promise3, promise4])

    await instance.end();

})