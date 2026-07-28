import { z } from "zod";

export const docCategoryEnum = z.enum(["ARCHITECTURE", "API_SPEC", "DESIGN_SYSTEM", "WIKI"]);

export const createKnowledgeDocSchema = z.object({
  title: z.string().min(3, "Doküman başlığı zorunludur"),
  category: docCategoryEnum.default("WIKI"),
  content: z.string().min(10, "İçerik en az 10 karakter olmalıdır"),
  tags: z.array(z.string()).default(["engineering", "nextjs"]),
});

export const queryDeveloperCopilotSchema = z.object({
  prompt: z.string().min(3, "Geliştirici sorusu zorunludur"),
  contextTarget: z.enum(["ARCHITECTURE", "CODE_SNIPPET", "API_SPEC"]).default("CODE_SNIPPET"),
});

export type CreateKnowledgeDocInput = z.infer<typeof createKnowledgeDocSchema>;
export type QueryDeveloperCopilotInput = z.infer<typeof queryDeveloperCopilotSchema>;
