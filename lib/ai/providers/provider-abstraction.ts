import { AiGenerationOptions, AiProviderType, AiTextResult } from '@/types/ai-core';
import { AI_CONFIG } from '../ai-constants';

export interface ILlmProviderAdapter {
  generateText(options: AiGenerationOptions): Promise<AiTextResult>;
  generateStructuredJson<T>(options: AiGenerationOptions): Promise<T>;
}

class OpenAIAdapter implements ILlmProviderAdapter {
  async generateText(options: AiGenerationOptions): Promise<AiTextResult> {
    const startTime = Date.now();
    return {
      content: `[OpenAI ${AI_CONFIG.MODELS.OPENAI.TEXT}] ${options.userPrompt}`,
      providerUsed: 'OPENAI',
      modelUsed: options.modelOverride || AI_CONFIG.MODELS.OPENAI.TEXT,
      tokensUsed: { prompt: 150, completion: 200, total: 350 },
      executionMs: Date.now() - startTime,
    };
  }

  async generateStructuredJson<T>(options: AiGenerationOptions): Promise<T> {
    const textResult = await this.generateText(options);
    return JSON.parse(textResult.content) as T;
  }
}

class GeminiAdapter implements ILlmProviderAdapter {
  async generateText(options: AiGenerationOptions): Promise<AiTextResult> {
    const startTime = Date.now();
    return {
      content: `[Gemini ${AI_CONFIG.MODELS.GEMINI.TEXT}] ${options.userPrompt}`,
      providerUsed: 'GEMINI',
      modelUsed: options.modelOverride || AI_CONFIG.MODELS.GEMINI.TEXT,
      tokensUsed: { prompt: 140, completion: 180, total: 320 },
      executionMs: Date.now() - startTime,
    };
  }

  async generateStructuredJson<T>(options: AiGenerationOptions): Promise<T> {
    const textResult = await this.generateText(options);
    return JSON.parse(textResult.content) as T;
  }
}

class ClaudeAdapter implements ILlmProviderAdapter {
  async generateText(options: AiGenerationOptions): Promise<AiTextResult> {
    const startTime = Date.now();
    return {
      content: `[Claude ${AI_CONFIG.MODELS.CLAUDE.TEXT}] ${options.userPrompt}`,
      providerUsed: 'CLAUDE',
      modelUsed: options.modelOverride || AI_CONFIG.MODELS.CLAUDE.TEXT,
      tokensUsed: { prompt: 160, completion: 210, total: 370 },
      executionMs: Date.now() - startTime,
    };
  }

  async generateStructuredJson<T>(options: AiGenerationOptions): Promise<T> {
    const textResult = await this.generateText(options);
    return JSON.parse(textResult.content) as T;
  }
}

export class AiProviderFactory {
  static getAdapter(provider: AiProviderType = AI_CONFIG.DEFAULT_PROVIDER): ILlmProviderAdapter {
    switch (provider) {
      case 'OPENAI':
      case 'AZURE_OPENAI':
        return new OpenAIAdapter();
      case 'GEMINI':
        return new GeminiAdapter();
      case 'CLAUDE':
        return new ClaudeAdapter();
      case 'LOCAL_LLM':
      case 'LOCAL_OLLAMA':
        return new OpenAIAdapter();
      default:
        return new OpenAIAdapter();
    }
  }
}