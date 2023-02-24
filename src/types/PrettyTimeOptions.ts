import { z } from "../../deps.ts";

export const PrettyTimeOptions = z.object({
  withSpaces: z.boolean().optional(),
  toFixedVal: z.number().optional(),
  longFormat: z.boolean().optional(),
});

export type PrettyTimeOptions = z.infer<typeof PrettyTimeOptions>;
