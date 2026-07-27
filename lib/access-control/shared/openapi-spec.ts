export const ACCESS_CONTROL_OPENAPI_SPEC = {
    openapi: '3.0.0',
    info: {
      title: 'WedyPlan Enterprise Permission & Access Control Engine API',
      version: '3.0.0',
      description: 'Dynamic multi-dimensional RBAC/PBAC evaluation and management service.',
    },
    paths: {
      '/api/v1/access-control/evaluate': {
        post: {
          summary: 'Evaluate Access Rights Realtime',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    userId: { type: 'string' },
                    roles: { type: 'array', items: { type: 'string' } },
                    portalContext: { type: 'string', enum: ['PUBLIC', 'COUPLE', 'VENDOR', 'ADMIN'] },
                    resource: { type: 'string', example: 'budget_item' },
                    action: { type: 'string', example: 'UPDATE' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Evaluation decision returned successfully.' },
            403: { description: 'Forbidden access denied.' },
          },
        },
      },
    },
  };