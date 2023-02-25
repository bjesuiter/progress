import { z } from "../../deps.ts";

export const ProgressBarString = z.object(
  {
    str: z.string(),
    strLen: z.number().min(0).optional(),
    end: z.boolean().optional(),

    /**
     * The relative index of all progress bars. 
     * Used to calculate where this progress bar is located in the cli
     */
    cliTargetIndex: z.number()
  },
);

export type ProgressBarString = z.infer<typeof ProgressBarString>;
