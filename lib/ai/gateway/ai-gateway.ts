import { AiGenerationOptions, AiExecutionResult } from '@/types/ai-core';
import { PiiMasker } from '../security/pii-masker';
import { PromptGuard } from '../security/prompt-guard';
import { ProviderAdapterFactory } from '../providers/provider-adapters';
import { AI_CONFIG } from '../domain/ai.constants';

export class AiGateway {
  /**
   * Universal AI Execution Entry Point with PII Masking, Security Guard & Fallback
   */
  static async execute(options: AiGenerationOptions): Promise<AiExecutionResult> {
    // 1. Security Check
    const guardResult = PromptGuard.isSafe(options.userPrompt);
    if (!guardResult.isSafe) {
      throw new Error(`AI Security Violation: ${guardResult.reason}`);
    }

    // 2. PII Masking
    let finalPrompt = options.userPrompt;
    if (!options.bypassPiiMasking) {
      const piiResult = PiiMasker.mask(options.userPrompt);
      finalPrompt = piiResult.maskedText;
    }

    const primaryProvider = options.providerOverride || AI_CONFIG.DEFAULT_PROVIDER;

    try {
      const adapter = ProviderAdapterFactory.getAdapter(primaryProvider);
      return await adapter.execute({ ...options, userPrompt: finalPrompt });
    } catch (primaryErr) {
      console.warn(`[AiGateway] Primary provider ${primaryProvider} failed. Triggering Fallback to ${AI_CONFIG.FALLBACK_PROVIDER}`);
      const fallbackAdapter = ProviderAdapterFactory.getAdapter(AI_CONFIG.FALLBACK_PROVIDER);
      return await fallbackAdapter.execute({ ...options, userPrompt: finalPrompt });
    }
  }
}