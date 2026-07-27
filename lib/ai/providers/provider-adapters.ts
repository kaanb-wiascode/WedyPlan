import { AiGenerationOptions, AiExecutionResult, AiProviderType } from '@/types/ai-core';
import { AI_CONFIG } from '../domain/ai.constants';

export interface ILlmAdapter {
  execute(options: AiGenerationOptions): Promise<AiExecutionResult>;
}

export class OpenAIAdapter implements ILlmAdapter {
  async execute(options: AiGenerationOptions): Promise<AiExecutionResult> {
    const startTime = Date.now();
    const model = options.modelOverride || AI_CONFIG.DEFAULT_MODELS.OPENAI;
    const promptTokens = Math.ceil(options.userPrompt.length / 4);
    const completionTokens = 150;
    
    const pricing = AI_CONFIG.MODEL_PRICING[model] || { prompt: 0.001, completion: 0.002 };
    const cost = (promptTokens / 1000) * pricing.prompt + (completionTokens / 1000) * pricing.completion;

    return {
      content: `[OpenAI ${model}] Processed: "${options.userPrompt.substring(0, 50)}..."`,
      providerUsed: 'OPENAI',
      modelUsed: model,
      promptTokens,
      completionTokens,
      totalTokens: promptTokens + completionTokens,
      estimatedCostUsd: Number(cost.toFixed(6)),
      executionMs: Date.now() - startTime
    };
  }
}

export class GeminiAdapter implements ILlmAdapter {
  async execute(options: AiGenerationOptions): Promise<AiExecutionResult> {
    const startTime = Date.now();
    const model = options.modelOverride || AI_CONFIG.DEFAULT_MODELS.GEMINI;
    const promptTokens = Math.ceil(options.userPrompt.length / 4);
    const completionTokens = 140;

    return {
      content: `[Gemini ${model}] Processed: "${options.userPrompt.substring(0, 50)}..."`,
      providerUsed: 'GEMINI',
      modelUsed: model,
      promptTokens,
      completionTokens,
      totalTokens: promptTokens + completionTokens,
      estimatedCostUsd: 0.0002,
      executionMs: Date.now() - startTime
    };
  }
}

export class ProviderAdapterFactory {
  static getAdapter(provider: AiProviderType): ILlmAdapter {
    switch (provider) {
      case 'OPENAI':
      case 'AZURE_OPENAI':
        return new OpenAIAdapter();
      case 'GEMINI':
        return new GeminiAdapter();
      default:
        return new OpenAIAdapter();
    }
  }
}