export const ENTERPRISE_AUDIT_OPENAPI_SPEC = {
    openapi: '3.0.0',
    info: {
      title: 'WedyPlan Enterprise Audit & Monitoring Platform API',
      version: '3.0.0',
      description: 'Centralized immutable compliance audit, activity timeline & latency metrics platform.',
    },
    paths: {
      '/api/v1/audit/logs': {
        post: {
          summary: 'Record Immutable Audit Log with State Diff',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    category: { type: 'string', example: 'CONTRACT' },
                    action: { type: 'string', example: 'CONTRACT_UPDATED' },
                    actorUserId: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Audit record logged with auto diff computation.' },
          },
        },
      },
    },
  };