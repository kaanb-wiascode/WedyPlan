export interface CrashReport {
    id: string;
    title: string;
    stackTrace: string;
    errorType: "UNHANDLED_EXCEPTION" | "ANR_STALL" | "MEMORY_LEAK" | "NETWORK_TIMEOUT";
    severity: "CRITICAL" | "WARNING" | "INFO";
    occurredAt: Date;
    clusterHash: string;
    affectedUsersCount: number;
    aiRootCause?: string;
    aiFixSuggestion?: string;
  }
  
  export class MobileDiagnosticsEngine {
    private static STORAGE_KEY = "WEDYPLAN_DIAGNOSTICS_REPORTS_V1";
  
    /**
     * Yakalanan Çökme veya İstisnayı Kaydeder ve Kümeleme Hesaplar
     */
    public static reportCrash(error: Error, type: CrashReport["errorType"] = "UNHANDLED_EXCEPTION"): CrashReport {
      const stack = error.stack || error.message;
      const clusterHash = this.generateClusterHash(stack);
  
      const newReport: CrashReport = {
        id: `crash_${Math.random().toString(36).substring(2, 9)}`,
        title: error.message || "Bilinmeyen İstemci Hatası",
        stackTrace: stack,
        errorType: type,
        severity: type === "ANR_STALL" || type === "UNHANDLED_EXCEPTION" ? "CRITICAL" : "WARNING",
        occurredAt: new Date(),
        clusterHash,
        affectedUsersCount: 1,
        aiRootCause: "WedyAI Analizi: Unhandled Async State — Asenkron veri çekiminde null check eksikliği.",
        aiFixSuggestion: "`if (!data) return <Skeleton />` kontrolünü bileşene ekleyin.",
      };
  
      const history = this.getReports();
      history.unshift(newReport);
  
      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history.slice(0, 50)));
      }
  
      return newReport;
    }
  
    /**
     * Tüm Çökme ve Telemetri Raporlarını Getirir
     */
    public static getReports(): CrashReport[] {
      if (typeof window !== "undefined") {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (data) return JSON.parse(data);
      }
  
      return [
        {
          id: "crash_101",
          title: "TypeError: Cannot read properties of undefined (reading 'contractId')",
          stackTrace: "at MobileContractCenter.tsx:42:15\nat React.useEffect",
          errorType: "UNHANDLED_EXCEPTION",
          severity: "CRITICAL",
          occurredAt: new Date(),
          clusterHash: "hash_err_contract_null",
          affectedUsersCount: 14,
          aiRootCause: "Kök Neden: İstemci çevrimdışı olduğunda sözleşme objesi `undefined` dönüyor.",
          aiFixSuggestion: "`lib/mobile/offline-engine.ts` içerisindeki varsayılan fallback kontrat objesini aktif edin.",
        },
        {
          id: "crash_102",
          title: "Main Thread Blocked (>1800ms) - High Memory Heap Usage",
          stackTrace: "at MobileMediaPicker.tsx:88:12 (Image Compression Canvas Loop)",
          errorType: "MEMORY_LEAK",
          severity: "WARNING",
          occurredAt: new Date(Date.now() - 3600000),
          clusterHash: "hash_err_canvas_mem",
          affectedUsersCount: 6,
          aiRootCause: "Kök Neden: 4K çözünürlüklü fotoğraflar bellekten silinmeden döngüye giriyor.",
          aiFixSuggestion: "Canvas bağlamı tamamlandığında `ctx.clearRect()` çağrısı yapın.",
        },
      ];
    }
  
    /**
     * Hata Kümeleri İçin Hash Üretici
     */
    private static generateClusterHash(stack: string): string {
      let hash = 0;
      for (let i = 0; i < stack.length; i++) {
        hash = (hash << 5) - hash + stack.charCodeAt(i);
        hash |= 0;
      }
      return `hash_${Math.abs(hash).toString(16)}`;
    }
  
    /**
     * Global Hata Dinleyicilerini Başlatır
     */
    public static initializeGlobalBoundary(): void {
      if (typeof window === "undefined") return;
  
      window.onerror = (message, source, lineno, colno, error) => {
        if (error) {
          this.reportCrash(error, "UNHANDLED_EXCEPTION");
        }
      };
  
      window.onunhandledrejection = (event) => {
        const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
        this.reportCrash(error, "UNHANDLED_EXCEPTION");
      };
    }
  }