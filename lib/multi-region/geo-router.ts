export interface RegionalNodeSummary {
  regionCode: string;
  regionName: string;
  status: "ONLINE" | "OPTIMIZED" | "DEGRADED";
  avgLatencyMs: number;
  activeUsersCount: number;
  regionalDbStatus: string;
  regionalStorageStatus: string;
  regionalAiProvider: string;
  dataResidencyStatus: string;
}

export function getMultiRegionStatusSnapshot(): RegionalNodeSummary[] {
  return [
    {
      regionCode: "EUROPE",
      regionName: "Europe (Frankfurt / London)",
      status: "OPTIMIZED",
      avgLatencyMs: 12,
      activeUsersCount: 42000,
      regionalDbStatus: "PostgreSQL Multi-Primary Sync",
      regionalStorageStatus: "S3 Europe Encrypted Bucket",
      regionalAiProvider: "OpenAI EU Gateway",
      dataResidencyStatus: "GDPR_ENFORCED",
    },
    {
      regionCode: "MIDDLE_EAST",
      regionName: "Middle East (Bahrain / Dubai)",
      status: "OPTIMIZED",
      avgLatencyMs: 24,
      activeUsersCount: 18500,
      regionalDbStatus: "PostgreSQL Read Replica",
      regionalStorageStatus: "S3 ME Encrypted Bucket",
      regionalAiProvider: "Azure ME AI Gateway",
      dataResidencyStatus: "LOCAL_LAW_COMPLIANT",
    },
    {
      regionCode: "NORTH_AMERICA",
      regionName: "North America (Virginia / Oregon)",
      status: "OPTIMIZED",
      avgLatencyMs: 18,
      activeUsersCount: 35000,
      regionalDbStatus: "PostgreSQL Read Replica",
      regionalStorageStatus: "S3 US Encrypted Bucket",
      regionalAiProvider: "Anthropic Claude US",
      dataResidencyStatus: "US_SOC2_ENFORCED",
    },
    {
      regionCode: "ASIA_PACIFIC",
      regionName: "Asia Pacific (Singapore / Tokyo)",
      status: "OPTIMIZED",
      avgLatencyMs: 32,
      activeUsersCount: 22000,
      regionalDbStatus: "PostgreSQL Read Replica",
      regionalStorageStatus: "S3 APAC Encrypted Bucket",
      regionalAiProvider: "AWS Bedrock APAC",
      dataResidencyStatus: "APAC_COMPLIANT",
    },
    {
      regionCode: "SOUTH_AMERICA",
      regionName: "South America (São Paulo)",
      status: "ONLINE",
      avgLatencyMs: 48,
      activeUsersCount: 8200,
      regionalDbStatus: "Global Edge DB Cache",
      regionalStorageStatus: "S3 SA Encrypted Bucket",
      regionalAiProvider: "OpenAI SA Gateway",
      dataResidencyStatus: "LGPD_ENFORCED",
    },
    {
      regionCode: "AFRICA",
      regionName: "Africa (Cape Town / Johannesburg)",
      status: "ONLINE",
      avgLatencyMs: 52,
      activeUsersCount: 4500,
      regionalDbStatus: "Global Edge DB Cache",
      regionalStorageStatus: "S3 AF Encrypted Bucket",
      regionalAiProvider: "AWS Bedrock AF",
      dataResidencyStatus: "POPIA_COMPLIANT",
    },
  ];
}
