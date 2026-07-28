import { z } from "zod";

export const generateApiKeySchema = z.object({
  keyName: z.string().min(2, "Key adı en az 2 karakter olmalıdır"),
  scopes: z.array(z.string()).default(["read"]),
});

export type GenerateApiKeyInput = z.infer<typeof generateApiKeySchema>;
