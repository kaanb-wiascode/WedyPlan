import { z } from "zod";

export const globalRegionEnum = z.enum([
  "EUROPE",
  "MIDDLE_EAST",
  "NORTH_AMERICA",
  "SOUTH_AMERICA",
  "ASIA_PACIFIC",
  "AFRICA",
]);

export const updateGeoRoutingSchema = z.object({
  region: globalRegionEnum,
  primaryNode: z.string().min(1, "Birincil düğüm zorunludur"),
  failoverRegion: globalRegionEnum.optional(),
  dataResidencyEnforced: z.boolean().default(true),
});

export const configureRegionalAISchema = z.object({
  region: globalRegionEnum,
  aiProvider: z.enum(["OPENAI_EU", "ANTHROPIC_US", "AZURE_ME", "AWS_BEDROCK_APAC"]).default("OPENAI_EU"),
  maxAllowedLatencyMs: z.number().default(150),
});

export type UpdateGeoRoutingInput = z.infer<typeof updateGeoRoutingSchema>;
export type ConfigureRegionalAIInput = z.infer<typeof configureRegionalAISchema>;
