import { z } from "zod";

export const compareProposalsSchema = z.object({
  proposalIds: z.array(z.string()).min(2, "Karşılaştırma için en az 2 teklif seçmelisiniz").max(3, "En fazla 3 teklif karşılaştırılabilir"),
  category: z.string().optional(),
});

export const acceptProposalSchema = z.object({
  proposalId: z.string().min(1, "Lütfen bir teklif seçiniz"),
  notes: z.string().optional(),
});

export type CompareProposalsInput = z.infer<typeof compareProposalsSchema>;
export type AcceptProposalInput = z.infer<typeof acceptProposalSchema>;
