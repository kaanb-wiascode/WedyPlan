export type NaturalLanguageInputMode = "TEXT_CHAT" | "VOICE_COMMAND";

export interface ExtractedEntity {
  entityKey: string; // e.g. "budget_limit", "guest_count", "location", "date"
  entityValue: string | number;
  confidenceScorePercent: number;
}

export interface ParsedNaturalLanguageCommand {
  id: string;
  rawInputText: string;
  mode: NaturalLanguageInputMode;
  recognizedIntent: string; // e.g. "SEARCH_VENUE", "LOCK_ESCROW", "SCHEDULE_APPOINTMENT"
  extractedEntities: ExtractedEntity[];
  targetAgentRole: string; // e.g. "CONCIERGE", "VENDOR_OPS", "FINANCE"
  isExecuted: boolean;
  executionResultSummary?: string;
  timestamp: Date;
}

export interface NaturalLanguagePlatformSummary {
  totalProcessedCommandsCount: number;
  voiceCommandAccuracyPercent: number;
  averageIntentRecognitionTimeMs: number;
  aiMultiTurnReasoningHealthPercent: number;
  aiNaturalLanguageInsightNote: string;
}

export class AiNaturalLanguageEngine {
  private static STORAGE_KEY = "WEDYPLAN_NATURAL_LANGUAGE_V1";

  /**
   * İşlenmiş Doğal Dil Komutlarını Getirir
   */
  public static async getProcessedCommands(): Promise<ParsedNaturalLanguageCommand[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "nl_101",
        rawInputText: "Boğaz'da 180 kişilik açık hava düğünü için ₺2.5M TL bütçeli mekan bul.",
        mode: "TEXT_CHAT",
        recognizedIntent: "SEARCH_VENUE_WITH_BUDGET",
        extractedEntities: [
          { entityKey: "location", entityValue: "Boğaz / İstanbul", confidenceScorePercent: 99 },
          { entityKey: "guest_count", entityValue: 180, confidenceScorePercent: 98 },
          { entityKey: "max_budget", entityValue: "2500000 TRY", confidenceScorePercent: 97 },
        ],
        targetAgentRole: "CONCIERGE",
        isExecuted: true,
        executionResultSummary: "Çırağan Palace ve Sait Halim Paşa Yalısı uygun olarak bulundu.",
        timestamp: new Date("2026-07-29T20:10:00"),
      },
      {
        id: "nl_102",
        rawInputText: "Çırağan Palace rezervasyonu için %20 depozitoyu Escrow'a kilitle.",
        mode: "VOICE_COMMAND",
        recognizedIntent: "LOCK_ESCROW_DEPOSIT",
        extractedEntities: [
          { entityKey: "venue_name", entityValue: "Çırağan Palace", confidenceScorePercent: 99 },
          { entityKey: "deposit_rate", entityValue: "20%", confidenceScorePercent: 99 },
        ],
        targetAgentRole: "FINANCE",
        isExecuted: true,
        executionResultSummary: "Phase 11 Escrow depozito kilitlenmesi başlatıldı.",
        timestamp: new Date("2026-07-29T20:40:00"),
      },
    ];
  }

  /**
   * Platform Özetini Getirir
   */
  public static async getPlatformSummary(): Promise<NaturalLanguagePlatformSummary> {
    return {
      totalProcessedCommandsCount: 2840,
      voiceCommandAccuracyPercent: 98.6,
      averageIntentRecognitionTimeMs: 18,
      aiMultiTurnReasoningHealthPercent: 99.1,
      aiNaturalLanguageInsightNote: "Doğal Dil İşleme (NLU) katmanı sesli komut ve metin komutlarını 18ms'de niyet ve varlıklara (Entities) %98.6 doğrulukla dönüştürmektedir.",
    };
  }

  /**
   * Yeni Doğal Dil Komutunu İşleme Simülasyonu
   */
  public static async parseAndExecuteCommand(
    text: string,
    mode: NaturalLanguageInputMode
  ): Promise<ParsedNaturalLanguageCommand> {
    const newCmd: ParsedNaturalLanguageCommand = {
      id: `nl_${Math.random().toString(36).substring(2, 9)}`,
      rawInputText: text,
      mode,
      recognizedIntent: text.toLowerCase().includes("bütçe") || text.toLowerCase().includes("mekan") ? "SEARCH_VENUE_WITH_BUDGET" : "GENERAL_ASSISTANCE",
      extractedEntities: [
        { entityKey: "query_text", entityValue: text, confidenceScorePercent: 96 },
      ],
      targetAgentRole: "CONCIERGE",
      isExecuted: true,
      executionResultSummary: "WedyAI Concierge komutu otonom olarak işledi ve yanıtladı.",
      timestamp: new Date(),
    };

    const commands = await this.getProcessedCommands();
    commands.unshift(newCmd);

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(commands));
    }

    return newCmd;
  }
}