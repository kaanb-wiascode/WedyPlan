import { AiProviderType } from '@/types/ai-core';

export const AI_CONFIG = {
  DEFAULT_PROVIDER: 'OPENAI' as AiProviderType,
  FALLBACK_PROVIDER: 'GEMINI' as AiProviderType,

  // Pricing per 1,000 tokens (USD)
  MODEL_PRICING: {
    'gpt-4o': { prompt: 0.005, completion: 0.015 },
    'gpt-4o-mini': { prompt: 0.00015, completion: 0.0006 },
    'gemini-1.5-pro': { prompt: 0.0035, completion: 0.0105 },
    'claude-3-5-sonnet-20240620': { prompt: 0.003, completion: 0.015 },
    'llama3:8b': { prompt: 0.0, completion: 0.0 }
  } as Record<string, { prompt: number; completion: number }>,

  DEFAULT_MODELS: {
    OPENAI: 'gpt-4o',
    AZURE_OPENAI: 'gpt-4o',
    GEMINI: 'gemini-1.5-pro',
    CLAUDE: 'claude-3-5-sonnet-20240620',
    LOCAL_OLLAMA: 'llama3:8b'
  } as Record<AiProviderType, string>
} as const;