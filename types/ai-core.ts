export type AiProviderType =
  | 'OPENAI'
  | 'AZURE_OPENAI'
  | 'GEMINI'
  | 'CLAUDE'
  | 'LOCAL_LLM'
  | 'LOCAL_OLLAMA';

export interface AiGenerationOptions {
  provider?: AiProviderType;
  providerOverride?: AiProviderType;
  modelOverride?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  userPrompt: string;
  jsonSchema?: Record<string, unknown>;
  userId?: string;
  portalContext?: string;
  bypassPiiMasking?: boolean;
}

export interface AiTextResult {
  content: string;
  providerUsed: AiProviderType;
  modelUsed: string;
  tokensUsed: { prompt: number; completion: number; total: number };
  executionMs: number;
}

export interface AiExecutionResult {
  content: string;
  providerUsed: AiProviderType;
  modelUsed: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCostUsd: number;
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

export interface BudgetItemExpense {
  category: string;
  amount: number;
  isPaid: boolean;
}

export interface BudgetAnalysisRequest {
  totalBudget: number;
  allocatedExpenses: BudgetItemExpense[];
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

export interface ContractAnalysisRequest {
  contractTextOrOcr: string;
  vendorCategory?: string;
  agreedPriceTotal?: number;
  userId?: string;
}

export interface ContractAnalysisResult {
  summary: string;
  overallRiskScore: number;
  agreedPriceExtracted?: number;
  depositAmountExtracted?: number;
  cancellationPolicySummary: string;
  riskFlags: {
    clauseTitle: string;
    description: string;
    riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
    mitigationAdvice: string;
  }[];
  hiddenCostWarnings: string[];
  missingStandardClauses: string[];
}