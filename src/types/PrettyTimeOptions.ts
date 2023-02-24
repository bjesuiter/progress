import { z } from "../../deps.ts";

export const PrettyTimeOptions = z.object({
  withSpaces: z.boolean().optional(),
  toFixedVal: z.number().optional(),
  longFormat: z.boolean().optional(),
});

/**
 * PrettyTime Options
 * - withSpaces Whether to use spaces to separate times, `1d2h3m5s` or `1d 2h 3m 5s`, default false
 * - toFixedVal value pass to toFixed for seconds, default 1
 * - longFormat Whether to use a long format, default false, `1d2h3m5s` or `1days 2hours 3minutes 5seconds`
 */
export type PrettyTimeOptions = z.infer<typeof PrettyTimeOptions>;
