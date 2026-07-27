export const ENTERPRISE_AI_OPENAPI_SPEC = {
    openapi: '3.0.0',
    info: {
      title: 'WedyPlan AI Core Platform API',
      version: '3.0.0',
      description: 'Centralized Multi-LLM Gateway with PII Protection & Legal Contract Analysis.',
    },
    paths: {
      '/api/v1/ai/generate': {
        post: {
          summary: 'Universal LLM Text & Data Generation',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    prompt: { type: 'string', example: 'Düğün bütçemi nasıl optimize edebilirim?' },
                    portalContext: { type: 'string', example: 'COUPLE' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Generated LLM response with token cost metadata.' },
          },
        },
      },
      '/api/v1/ai/analyze-contract': {
        post: {
          summary: 'Legal Contract Risk & Hidden Fee Analysis',
          responses: {
            200: { description: 'Contract risk analysis report returned.' },
          },
        },
      },
    },
  };