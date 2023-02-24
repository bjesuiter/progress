import { z } from "../../deps.ts";
import { PrettyTimeOptions } from "./PrettyTimeOptions.ts";

export const ProgressBarData = z.object(
  {
    completed: z.number(),
    text: z.string().optional(),
    total: z.number().optional(),
    complete: z.number().optional(),
    incomplete: z.string().optional(),
    prettyTimeOptions: PrettyTimeOptions,
  },
);

export type ProgressBarData = z.infer<typeof ProgressBarData>;
