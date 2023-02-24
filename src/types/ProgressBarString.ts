import { z } from "../../deps.ts";

export const ProgressBarString = z.object(
  {
   str: z.string(), 
   strLen: z.number().min(0).optional(),
   end: z.boolean().optional()
  },
);

export type ProgressBarString = z.infer<typeof ProgressBarString>;
