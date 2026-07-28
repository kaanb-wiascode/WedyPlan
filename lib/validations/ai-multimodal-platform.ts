import { z } from "zod";

export const inputTypeEnum = z.enum([
  "IMAGE_MOODBOARD",
  "CONTRACT_PDF",
  "VENDOR_PORTFOLIO",
  "AUDIO_RECORDING",
  "VIDEO_CLIP",
]);

export const processMultimodalPayloadSchema = z.object({
  inputType: inputTypeEnum.default("IMAGE_MOODBOARD"),
  payloadUrl: z.string().url().default("https://assets.wedyplan.com/samples/bodrum_rustic_decor.jpg"),
  enableOCR: z.boolean().default(true),
  enableStyleRecognition: z.boolean().default(true),
  enableContractExtraction: z.boolean().default(false),
});

export const executeVisualSearchSchema = z.object({
  imageVectorId: z.string().min(1),
  topK: z.number().min(1).max(20).default(5),
});

export type ProcessMultimodalPayloadInput = z.infer<typeof processMultimodalPayloadSchema>;
export type ExecuteVisualSearchInput = z.infer<typeof executeVisualSearchSchema>;
