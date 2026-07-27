export type AiProviderType = 'OPENAI' | 'GEMINI' | 'CLAUDE' | 'LOCAL_LLM';

export interface AiGenerationOptions {
  provider?: AiProviderType;
  modelOverride?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  userPrompt: string;
  jsonSchema?: Record<string, unknown>;
  userId?: string;
  portalContext?: string;
}

export interface AiTextResult {
  content: string;
  providerUsed: AiProviderType;
  modelUsed: string;
  tokensUsed: { prompt: number; completion: number; total: number };
  executionMs: number;
}

export interface VendorMatchCriteria {
  naturalLanguageQuery: string;
  city?: string;
  budgetLimit?: number;
  guestCount?: number;
  preferredConcepts?: string[];
}

export interface VendorMatchResult {
  vendorId: string;
  matchScore: number; // 0-100
  reasoning: string[];
  suggestedNegotiationPoint?: string;
}

export interface BudgetAnalysisRequest {
  totalBudget: number;
  allocatedExpenses: { category: string; amount: number; isPaid: boolean }[];
  guestCount: number;
  city: string;
}

export interface BudgetAnalysisResult {
  healthScore: number; // 0-100
  status: 'HEALTHY' | 'AT_RISK' | 'OVER_BUDGET';
  predictedOverflowAmount: number;
  savingOpportunities: { category: string; potentialSavings: number; actionAdvice: string }[];
  suggestedAllocations: { category: string; recommendedPercent: number; recommendedAmount: number }[];
}

export interface TimelineGenerationRequest {
  weddingDate: string;
  startTime: string;
  endTime: string;
  venueType: 'OUTDOOR' | 'HALL' | 'HISTORIC' | 'HOTEL';
  hasAfterParty: boolean;
  guestCount: number;
}

export interface TimelineEvent {
  timeSlot: string;
  title: string;
  description: string;
  responsibleParty: string;
  importance: 'CRITICAL' | 'STANDARD' | 'OPTIONAL';
}

export interface TimelineGenerationResult {
  summary: string;
  schedule: TimelineEvent[];
  criticalPathAlerts: string[];
}

export interface DocumentReaderRequest {
  documentTextOrOcr: string;
  documentType: 'CONTRACT' | 'OFFER' | 'INVOICE';
}

export interface DocumentReaderResult {
  extractedData: {
    vendorName?: string;
    coupleName?: string;
    agreedPrice?: number;
    paymentSchedule?: { dueDate: string; amount: number; isPaid: boolean }[];
    cancellationClauseSummary?: string;
    includedServices?: string[];
    excludedServices?: string[];
  };
  confidenceScore: number; // 0-100
  riskFlags: string[];
}