export interface ComponentRecoveryStatusSummary {
  component: string;
  name: string;
  targetRpoMin: number;
  achievedRpoMin: number;
  targetRtoMin: number;
  achievedRtoMin: number;
  lastSyncTimestamp: string;
  syncStatus: "IN_SYNC" | "SYNCING" | "LAGGING" | "OUT_OF_SYNC";
  replicationRegion: string;
}

export function getDRStatusSnapshot(): ComponentRecoveryStatusSummary[] {
  return [
    {
      component: "DATABASE",
      name: "PostgreSQL Primary WAL Streaming",
      targetRpoMin: 1,
      achievedRpoMin: 0.2,
      targetRtoMin: 5,
      achievedRtoMin: 2.5,
      lastSyncTimestamp: "Anlık (12s önce)",
      syncStatus: "IN_SYNC",
      replicationRegion: "eu-central-1 (Frankfurt)",
    },
    {
      component: "OBJECT_STORAGE",
      name: "S3 Wedding Media Storage Cross-Region",
      targetRpoMin: 5,
      achievedRpoMin: 1.0,
      targetRtoMin: 15,
      achievedRtoMin: 8.0,
      lastSyncTimestamp: "1 dk önce",
      syncStatus: "IN_SYNC",
      replicationRegion: "eu-west-1 (Ireland)",
    },
    {
      component: "AI_MEMORY",
      name: "Vector Memory Store & Embeddings Dump",
      targetRpoMin: 2,
      achievedRpoMin: 0.5,
      targetRtoMin: 10,
      achievedRtoMin: 4.0,
      lastSyncTimestamp: "30s önce",
      syncStatus: "IN_SYNC",
      replicationRegion: "eu-central-1 (Frankfurt)",
    },
    {
      component: "SECRETS",
      name: "Vault KMS Encrypted Secrets Sync",
      targetRpoMin: 1,
      achievedRpoMin: 0.1,
      targetRtoMin: 3,
      achievedRtoMin: 1.0,
      lastSyncTimestamp: "Anlık (5s önce)",
      syncStatus: "IN_SYNC",
      replicationRegion: "eu-west-1 (Ireland)",
    },
  ];
}
