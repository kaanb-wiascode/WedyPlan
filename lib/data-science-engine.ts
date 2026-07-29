export type NotebookRuntimeStatus = "RUNNING" | "IDLE" | "STOPPED";
export type ModelStageStatus = "EXPERIMENTATION" | "STAGING_REVIEW" | "PROMOTED_TO_PRODUCTION";

export interface MlExperimentRecord {
  id: string;
  experimentName: string; // e.g. "couple_escrow_deposit_prediction_v3"
  authorScientist: string; // e.g. "Dr. Arda Yılmaz (Lead ML Engineer)"
  notebookName: string; // e.g. "escrow_conversion_xgboost.ipynb"
  runtimeStatus: NotebookRuntimeStatus;
  stage: ModelStageStatus;
  primaryMetricName: string; // e.g. "ROC-AUC Score"
  primaryMetricValue: number; // e.g. 0.968
  hyperparametersSummary: string; // e.g. "learning_rate: 0.01, max_depth: 6, n_estimators: 500"
  featureStoreDependencies: string[]; // e.g. ["ft_101", "ft_102"]
  aiExperimentRecommendation: string;
  aiSuggestedDatasetJoin: string;
  lastTrainedAt: Date;
}

export interface DataSciencePlatformSummary {
  totalActiveExperimentsCount: number;
  totalNotebookInstancesRunningCount: number;
  promotedProductionModelsCount: number;
  averageModelAccuracyScorePercent: number;
  aiDataScienceInsightNote: string;
}

export class DataScienceEngine {
  private static STORAGE_KEY = "WEDYPLAN_DATA_SCIENCE_V1";

  /**
   * ML Deney Kayıtlarını Getirir
   */
  public static async getExperiments(): Promise<MlExperimentRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "exp_101",
        experimentName: "couple_escrow_deposit_prediction_v3",
        authorScientist: "Dr. Arda Yılmaz (Lead ML Engineer)",
        notebookName: "escrow_conversion_xgboost.ipynb",
        runtimeStatus: "RUNNING",
        stage: "STAGING_REVIEW",
        primaryMetricName: "ROC-AUC Score",
        primaryMetricValue: 0.968,
        hyperparametersSummary: "learning_rate: 0.01, max_depth: 6, n_estimators: 500",
        featureStoreDependencies: ["couple_escrow_conversion_prob", "venue_sla_vector"],
        aiExperimentRecommendation: "Max depth parametresini 5'e indirerek overfitting riski %12 düşürülebilir.",
        aiSuggestedDatasetJoin: "Öneri: 'Data Lake Gold / curated_financial_escrow' verisetini bağlayarak +%2.4 model başarısı kazanın.",
        lastTrainedAt: new Date("2026-07-29T23:20:00"),
      },
      {
        id: "exp_102",
        experimentName: "venue_sla_compliance_clustering_v2",
        authorScientist: "Selin Kaya (Senior Data Scientist)",
        notebookName: "vendor_clustering_kmeans.ipynb",
        runtimeStatus: "IDLE",
        stage: "PROMOTED_TO_PRODUCTION",
        primaryMetricName: "Silhouette Score",
        primaryMetricValue: 0.912,
        hyperparametersSummary: "k_clusters: 8, init: k-means++, max_iter: 300",
        featureStoreDependencies: ["venue_capacity_sla_vector"],
        aiExperimentRecommendation: "Kümeler arası mesafe mükemmel düzeydedir. Phase 13 AI Ajan servisiyle entegre edildi.",
        aiSuggestedDatasetJoin: "Pazaryeri canlı rezervasyon akışı Feature Store ile senkronizedir.",
        lastTrainedAt: new Date("2026-07-29T22:50:00"),
      },
      {
        id: "exp_103",
        experimentName: "marketing_cac_ltv_forecasting_lstm",
        authorScientist: "Mert Demir (AI Researcher)",
        notebookName: "ltv_cac_time_series.ipynb",
        runtimeStatus: "STOPPED",
        stage: "EXPERIMENTATION",
        primaryMetricName: "MAPE (Mean Abs Error)",
        primaryMetricValue: 0.042,
        hyperparametersSummary: "hidden_units: 128, epoch: 100, optimizer: Adam",
        featureStoreDependencies: ["growth_ltv_cac_ratio"],
        aiExperimentRecommendation: "Epoch sayısını 150 seviyesine çekerek eğitim kaybını %0.008 seviyesine düşürün.",
        aiSuggestedDatasetJoin: "Öneri: 'CRM Couple Interactions' verisetini zaman serisine bağlayın.",
        lastTrainedAt: new Date("2026-07-29T22:15:00"),
      },
    ];
  }

  /**
   * Data Science Platform Özetini Getirir
   */
  public static async getSummary(): Promise<DataSciencePlatformSummary> {
    return {
      totalActiveExperimentsCount: 14,
      totalNotebookInstancesRunningCount: 6,
      promotedProductionModelsCount: 8,
      averageModelAccuracyScorePercent: 96.2,
      aiDataScienceInsightNote: "WedyAI AutoML Asistanı 14 aktif deneyi izlemekte, ROC-AUC skorunu %96.2 seviyesinde tutmakta ve Feature Store ile 2.8ms sürede veri beslemektedir.",
    };
  }

  /**
   * Modeli Üretime Yükseltme (Promote to Production) Simülasyonu
   */
  public static async promoteModel(experimentId: string): Promise<boolean> {
    const experiments = await this.getExperiments();
    const idx = experiments.findIndex((e) => e.id === experimentId);

    if (idx !== -1) {
      experiments[idx].stage = "PROMOTED_TO_PRODUCTION";
      experiments[idx].lastTrainedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(experiments));
      }
      return true;
    }
    return false;
  }
}