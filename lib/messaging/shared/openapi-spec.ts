export const ENTERPRISE_MESSAGING_OPENAPI_SPEC = {
    openapi: '3.0.0',
    info: {
      title: 'WedyPlan Enterprise Messaging Platform API',
      version: '3.0.0',
      description: 'Centralized real-time messaging, spam moderation and socket event platform.',
    },
    paths: {
      '/api/v1/messaging/conversations': {
        post: {
          summary: 'Create or Initialize Conversation Session',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    type: { type: 'string', example: 'COUPLE_VENDOR' },
                    participantUserIds: { type: 'array', items: { type: 'string' } },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Conversation session created successfully.' },
          },
        },
      },
    },
  };