import { z } from "../../deps.ts";
import { PrettyTimeOptions } from "./PrettyTimeOptions.ts";

export const ProgressBarData = z.object(
  {
    completed: z.number().min(0),
    text: z.string().default(""),
    total: z.number().int().default(100),
    complete: z.number().optional(),
    incomplete: z.string().optional(),
    prettyTimeOptions: PrettyTimeOptions,
  },
);

export type ProgressBarData = z.infer<typeof ProgressBarData>;
