import { z } from "zod";

export const experimentCategoryEnum = z.enum([
  "COPILOT_CHAT",
  "CONTRACT_ANALYSIS",
  "BUDGET_FORECAST",
  "MULTIMODAL_VISION",
  "SEARCH_RANKING",
]);

export const runModelExperimentSchema = z.object({
  experimentName: z.string().min(2, "Deney adı en az 2 karakter olmalıdır"),
  category: experimentCategoryEnum.default("COPILOT_CHAT"),
  testPrompt: z.string().min(5, "Test istemi en az 5 karakter olmalıdır"),
  candidateModels: z.array(z.string()).default(["gpt-4o", "claude-3-5-sonnet", "gemini-1.5-pro"]),
  autoSelectWinner: z.boolean().default(true),
});

export const selectAutomaticWinnerSchema = z.object({
  experimentId: z.string().min(1),
  winningModel: z.string().min(1),
  reason: z.string().optional(),
});

export type RunModelExperimentInput = z.infer<typeof runModelExperimentSchema>;
export type SelectAutomaticWinnerInput = z.infer<typeof selectAutomaticWinnerSchema>;
