import { z } from "../../deps.ts"

export const ProgressBarDefinition = z.object({
    label: z.string().default(''),
    total: z.number().positive().default(100),
    progressStream: z.instanceof(ReadableStream<number>)
});

export type ProgressBarDefinition = z.infer<typeof ProgressBarDefinition>