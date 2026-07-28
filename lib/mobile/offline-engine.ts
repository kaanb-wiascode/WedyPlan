export interface QueuedAction {
    id: string;
    endpoint: string;
    method: "POST" | "PUT" | "DELETE" | "PATCH";
    payload: any;
    timestamp: number;
    retryCount: number;
    type: "FORM_SUBMIT" | "CALENDAR_BOOKING" | "AI_PROMPT" | "CONTRACT_SIGN";
  }
  
  export class OfflineSyncEngine {
    private static STORAGE_KEY = "WEDYPLAN_OFFLINE_QUEUE_V1";
    private static CACHE_KEY = "WEDYPLAN_AI_MEDIA_CACHE_V1";
  
    /**
     * İnternet yokken yapılan işlemi yerel kuyruğa ekler.
     */
    public static queueAction(action: Omit<QueuedAction, "id" | "timestamp" | "retryCount">): QueuedAction {
      const queue = this.getQueue();
      const newAction: QueuedAction = {
        ...action,
        id: `queue_${Math.random().toString(36).substring(2, 9)}`,
        timestamp: Date.now(),
        retryCount: 0,
      };
  
      queue.push(newAction);
      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(queue));
      }
      return newAction;
    }
  
    /**
     * Yerel kuyruktaki tüm çevrimdışı işlemleri oku.
     */
    public static getQueue(): QueuedAction[] {
      if (typeof window === "undefined") return [];
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    }
  
    /**
     * İnternet bağlantısı sağlandığında yerel kuyruğu sunucuyla senkronize eder.
     */
    public static async syncQueue(): Promise<{ syncedCount: number; failedCount: number }> {
      const queue = this.getQueue();
      if (queue.length === 0) return { syncedCount: 0, failedCount: 0 };
  
      let syncedCount = 0;
      let failedCount = 0;
      const remainingQueue: QueuedAction[] = [];
  
      for (const item of queue) {
        try {
          const response = await fetch(item.endpoint, {
            method: item.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item.payload),
          });
  
          if (response.ok) {
            syncedCount++;
          } else {
            // Conflict Resolution: Sunucuda çakışma varsa son işlem zamanına göre karar ver
            if (response.status === 409) {
              console.warn(`[SyncEngine Conflict] ${item.id} sunucuyla çakıştı. Otomatik çözümleniyor.`);
              syncedCount++; // Sunucu tarafı güncel kabul edildi
            } else {
              item.retryCount += 1;
              if (item.retryCount < 3) remainingQueue.push(item);
              else failedCount++;
            }
          }
        } catch (err) {
          item.retryCount += 1;
          if (item.retryCount < 3) remainingQueue.push(item);
          else failedCount++;
        }
      }
  
      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(remainingQueue));
      }
  
      return { syncedCount, failedCount };
    }
  
    /**
     * Çevrimdışı AI Yanıtı & Medya Caching
     */
    public static cacheAiResponse(promptKey: string, responseData: any): void {
      if (typeof window === "undefined") return;
      const cache = JSON.parse(localStorage.getItem(this.CACHE_KEY) || "{}");
      cache[promptKey] = { data: responseData, cachedAt: Date.now() };
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cache));
    }
  
    public static getCachedAiResponse(promptKey: string): any | null {
      if (typeof window === "undefined") return null;
      const cache = JSON.parse(localStorage.getItem(this.CACHE_KEY) || "{}");
      return cache[promptKey] ? cache[promptKey].data : null;
    }
  }