import { BudgetAnalysisRequest, BudgetAnalysisResult } from '@/types/ai-core';

export class BudgetAnalysisEngine {
  /**
   * Analyzes couple budget, detects risks and recommends optimizations
   */
  static analyze(request: BudgetAnalysisRequest): BudgetAnalysisResult {
    const totalSpent = request.allocatedExpenses.reduce((acc, curr) => acc + curr.amount, 0);
    const overflow = totalSpent - request.totalBudget;

    let status: 'HEALTHY' | 'AT_RISK' | 'OVER_BUDGET' = 'HEALTHY';
    if (totalSpent > request.totalBudget * 0.9) status = 'AT_RISK';
    if (totalSpent > request.totalBudget) status = 'OVER_BUDGET';

    return {
      healthScore: Math.max(0, 100 - Math.floor((totalSpent / request.totalBudget) * 100 - 100)),
      status,
      predictedOverflowAmount: Math.max(0, overflow),
      savingOpportunities: [
        {
          category: 'Süsleme & Çiçek',
          potentialSavings: 25000,
          actionAdvice: 'Mevsim çiçekleri yerine botanik yapay zemin çiçekleri tercih ederek maliyeti %30 düşürebilirsiniz.'
        }
      ],
      suggestedAllocations: [
        { category: 'Düğün Salonu', recommendedPercent: 45, recommendedAmount: request.totalBudget * 0.45 },
        { category: 'Fotoğraf & Video', recommendedPercent: 15, recommendedAmount: request.totalBudget * 0.15 },
        { category: 'Gelinlik & Damatlık', recommendedPercent: 15, recommendedAmount: request.totalBudget * 0.15 },
        { category: 'Müzik & DJ', recommendedPercent: 10, recommendedAmount: request.totalBudget * 0.10 },
        { category: 'Diğer & Yedek Akçe', recommendedPercent: 15, recommendedAmount: request.totalBudget * 0.15 }
      ]
    };
  }
}