import { AiProviderType } from '@/types/ai-core';

export const AI_CONFIG = {
  DEFAULT_PROVIDER: 'OPENAI' as AiProviderType,
  FALLBACK_PROVIDER: 'GEMINI' as AiProviderType,

  MODELS: {
    OPENAI: {
      TEXT: 'gpt-4o',
      FAST: 'gpt-4o-mini',
      EMBEDDING: 'text-embedding-3-small',
    },
    GEMINI: {
      TEXT: 'gemini-1.5-pro',
      FAST: 'gemini-1.5-flash',
    },
    CLAUDE: {
      TEXT: 'claude-3-5-sonnet-20240620',
      FAST: 'claude-3-haiku-20240307',
    },
    LOCAL_LLM: {
      TEXT: 'llama3:8b',
    },
  },

  DEFAULT_TEMPERATURE: 0.3, // Lower for structured accuracy
  MAX_TOKENS_DEFAULT: 2000,
} as const;