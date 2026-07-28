import { GenerateTimelineInput } from "@/lib/validations/ai-timeline-engine";

export interface TimelineTask {
  id: string;
  timeSlot: string;
  title: string;
  durationMinutes: number;
  isCriticalPath: boolean;
  dependsOnTaskId?: string;
  delayRiskScore: number;
  status: "COMPLETED" | "ON_SCHEDULE" | "DELAY_RISK";
}

export interface TimelineAnalysisResult {
  healthScore: number;
  totalCriticalTasks: number;
  predictedDelayMinutes: number;
  tasks: TimelineTask[];
  aiAnalysis: string;
}

export function generateAdaptiveTimeline(input: GenerateTimelineInput): TimelineAnalysisResult {
  const isOutdoor = input.locationType === "OUTDOOR_GARDEN" || input.locationType === "DESTINATION_BEACH";
  const healthScore = isOutdoor ? 89 : 95;
  const predictedDelay = isOutdoor ? 25 : 10;

  const tasks: TimelineTask[] = [
    { id: "task_1", timeSlot: "10:00 - 13:00", title: "Gelin & Damat Saç - Makyaj Hazırlığı", durationMinutes: 180, isCriticalPath: true, delayRiskScore: 35, status: "DELAY_RISK" },
    { id: "task_2", timeSlot: "13:30 - 15:30", title: "Dış Çekim / Fotoğraf & Video Çekimi", durationMinutes: 120, isCriticalPath: true, dependsOnTaskId: "task_1", delayRiskScore: 20, status: "ON_SCHEDULE" },
    { id: "task_3", timeSlot: "16:00 - 17:00", title: "Mekan İntikali & Tedarikçi Soundcheck", durationMinutes: 60, isCriticalPath: false, delayRiskScore: 10, status: "ON_SCHEDULE" },
    { id: "task_4", timeSlot: "18:00 - 19:00", title: "Davetli Karşılama & Kokteyl", durationMinutes: 60, isCriticalPath: false, delayRiskScore: 5, status: "ON_SCHEDULE" },
    { id: "task_5", timeSlot: "19:30 - 20:15", title: "Nikah Seremonisi & İlk Dans", durationMinutes: 45, isCriticalPath: true, dependsOnTaskId: "task_2", delayRiskScore: 15, status: "ON_SCHEDULE" },
    { id: "task_6", timeSlot: "20:30 - 22:00", title: "Yemek Servisi & Canlı Müzik Performansı", durationMinutes: 90, isCriticalPath: false, delayRiskScore: 10, status: "ON_SCHEDULE" },
    { id: "task_7", timeSlot: "22:30 - 23:00", title: "Pasta Kesimi & Tebrikler", durationMinutes: 30, isCriticalPath: true, dependsOnTaskId: "task_5", delayRiskScore: 5, status: "ON_SCHEDULE" },
  ];

  return {
    healthScore,
    totalCriticalTasks: tasks.filter(t => t.isCriticalPath).length,
    predictedDelayMinutes: predictedDelay,
    tasks,
    aiAnalysis: "Wedding Timeline Engine, Saç-Makyaj adımını %35 gecikme riskiyle Kritik Yol (Critical Path) olarak belirlemiş ve fotoğraf çekimine 30 dakikalık esnek tampon süre eklemiştir.",
  };
}
