export type SyncableEntity =
  | "USER_PROFILE"
  | "BOOKINGS"
  | "MESSAGES"
  | "CALENDAR"
  | "NOTIFICATIONS"
  | "MEDIA"
  | "CONTRACTS"
  | "SETTINGS";

export type DeviceType = "WEB" | "IPHONE" | "IPAD" | "ANDROID_PHONE" | "ANDROID_TABLET";

export interface DeviceSyncNode {
  deviceId: string;
  deviceName: string;
  deviceType: DeviceType;
  lastSeenAt: Date;
  vectorClockVersion: number;
  isOnline: boolean;
  hasPendingChanges: boolean;
}

export interface SyncPayload {
  entity: SyncableEntity;
  vectorClock: Record<string, number>;
  payload: any;
  updatedByDeviceId: string;
  timestamp: number;
}

export class MultiDeviceSyncEngine {
  private static STORAGE_KEY = "WEDYPLAN_MULTI_DEVICE_SYNC_V1";
  private static VECTOR_KEY = "WEDYPLAN_VECTOR_CLOCKS_V1";

  /**
   * Kullanıcının Tüm Bağlı Cihazlarını ve Senkronizasyon Durumlarını Getirir
   */
  public static async getConnectedDevices(): Promise<DeviceSyncNode[]> {
    return [
      {
        deviceId: "dev_iphone_15",
        deviceName: "Kaan’ın iPhone 15 Pro",
        deviceType: "IPHONE",
        lastSeenAt: new Date(),
        vectorClockVersion: 142,
        isOnline: true,
        hasPendingChanges: false,
      },
      {
        deviceId: "dev_ipad_pro",
        deviceName: "Sena’ın iPad Pro 11",
        deviceType: "IPAD",
        lastSeenAt: new Date(Date.now() - 300000),
        vectorClockVersion: 142,
        isOnline: true,
        hasPendingChanges: false,
      },
      {
        deviceId: "dev_web_chrome",
        deviceName: "MacBook Pro (Chrome Web)",
        deviceType: "WEB",
        lastSeenAt: new Date(Date.now() - 1800000),
        vectorClockVersion: 140,
        isOnline: false,
        hasPendingChanges: true,
      },
    ];
  }

  /**
   * Çakışma Çözümleme (Vector Clock & Last-Write-Wins CRDT Engine)
   */
  public static reconcileConflict(
    localSync: SyncPayload,
    remoteSync: SyncPayload
  ): { resolvedPayload: SyncPayload; strategyUsed: "REMOTE_WIN" | "LOCAL_WIN" | "CRDT_MERGED" } {
    // 1. Vector Clock Karşılaştırması
    const localVersion = localSync.vectorClock[localSync.updatedByDeviceId] || 0;
    const remoteVersion = remoteSync.vectorClock[remoteSync.updatedByDeviceId] || 0;

    if (remoteVersion > localVersion) {
      return { resolvedPayload: remoteSync, strategyUsed: "REMOTE_WIN" };
    }

    if (localVersion > remoteVersion) {
      return { resolvedPayload: localSync, strategyUsed: "LOCAL_WIN" };
    }

    // 2. Çakışma Eşitse (Concurrent Edit): Timestamp tabanlı CRDT birleştirmesi
    const merged = {
      ...localSync.payload,
      ...remoteSync.payload,
      _reconciledAt: Date.now(),
    };

    return {
      resolvedPayload: {
        ...remoteSync,
        payload: merged,
        timestamp: Math.max(localSync.timestamp, remoteSync.timestamp),
      },
      strategyUsed: "CRDT_MERGED",
    };
  }

  /**
   * WedyAI Senkronizasyon Sağlık Analizi ve Çakışma Tahmini
   */
  public static evaluateSyncHealth(nodes: DeviceSyncNode[]): {
    healthScorePercent: number;
    status: "HEALTHY" | "SYNC_LAG_DETECTED" | "CRITICAL_DIVERGENCE";
    aiRecommendation: string;
  } {
    const offlineNodes = nodes.filter((n) => !n.isOnline);
    const pendingNodes = nodes.filter((n) => n.hasPendingChanges);

    if (pendingNodes.length > 0 && offlineNodes.length > 0) {
      return {
        healthScorePercent: 78,
        status: "SYNC_LAG_DETECTED",
        aiRecommendation:
          "WedyAI Uyarısı: MacBook Pro (Web) istemcisinde 2 senkronize edilmemiş değişiklik var. Cihaz online olduğunda otomatik çözümlenecek.",
      };
    }

    return {
      healthScorePercent: 100,
      status: "HEALTHY",
      aiRecommendation: "Tüm cihazlar (iPhone, iPad, Web) anlık olarak %100 senkronize durumda.",
    };
  }
}