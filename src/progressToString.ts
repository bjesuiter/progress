
import { stripColor } from "../deps.ts";
import { prettyTime } from "../time.ts";
import { PrettyTimeOptions } from './types/PrettyTimeOptions.ts';
import { ProgressBarString } from './types/ProgressBarString.ts';

function ttyColumns(): number {
    if (!Deno.isatty(Deno.stdout.rid)) return 100;
    return Deno.consoleSize().columns;
}

export function progressToString(
    { total,
        label,
        prettyTimeOn,
        prettyTimeOptions,
        templateString,
        minWidth,
        completeChar,
        incompleteChar,
        cliRow
    }: {
        total: number,
        label: string,
        prettyTimeOn: boolean,
        prettyTimeOptions?: PrettyTimeOptions,
        templateString: string,
        minWidth: number,
        completeChar: string,
        incompleteChar: string,
        cliRow: number,
    }) {

    let start = 0;
    let previousStr: string;
    let previousStrLen: number;

    const transform = new TransformStream<number, ProgressBarString>({
        start: () => {
            start = Date.now()
        },
        transform(completed, controller) {
            const now = Date.now()

            const percent = ((completed / total) * 100).toFixed(2) + "%";
            const time = prettyTimeOn
                ? prettyTime(now - start, prettyTimeOptions)
                : ((now - start) / 1000).toFixed(1) + "s";
            const msEta = completed >= total
                ? 0
                : (total / completed - 1) * (now - start);
            const eta = completed == 0
                ? "-"
                : prettyTimeOn
                    ? prettyTime(msEta, prettyTimeOptions)
                    : (msEta / 1000).toFixed(1) +
                    "s";

            // :bar :text :percent :time :completed/:total
            let str = templateString
                .replace(":text", label)
                .replace(":time", time)
                .replace(":eta", eta)
                .replace(":percent", percent)
                .replace(":completed", completed + "")
                .replace(":total", total + "");

            // compute the available space (non-zero) for the bar
            const availableSpace = Math.max(
                0,
                ttyColumns() - str.replace(":bar", "").length,
            );

            // :bar
            const width = Math.min(minWidth, availableSpace);
            const completeLength = Math.round(width * completed / total);
            const complete = new Array(completeLength)
                .fill(completeChar)
                .join("");
            const incomplete = new Array(width - completeLength)
                .fill(incompleteChar)
                .join("");

            str = str.replace(":bar", complete + incomplete);
            const strLen = stripColor(str).length;

            // FIXME: WHEN DOES THIS HAPPEN!?!?!?
            if (str != previousStr) {
                const lastStrLen = previousStrLen;

                // FIXME: WHY SHOULD I PAD THE STRING AT THE END?!?!?!?
                if (strLen < lastStrLen) {
                    str += " ".repeat(lastStrLen - strLen);
                }
            }
            // SCHINKEN!!!!!!!!!!!!

            const result: ProgressBarString = {
                str,
                strLen,
                end: completed >= total,
                cliTargetIndex: cliRow
            }

            controller.enqueue(result);
        },
    });

    return transform;

}


