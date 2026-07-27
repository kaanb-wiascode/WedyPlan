export const UNIVERSAL_NOTIFICATIONS_OPENAPI_SPEC = {
    openapi: '3.0.0',
    info: {
      title: 'WedyPlan Universal Notification Engine API',
      version: '3.0.0',
      description: 'Centralized 7-channel multi-lingual event-driven notification service.',
    },
    paths: {
      '/api/v1/notifications/dispatch': {
        post: {
          summary: 'Dispatch Universal Notification Across Channels',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    userId: { type: 'string' },
                    templateCode: { type: 'string', example: 'OFFER_RECEIVED' },
                    category: { type: 'string', example: 'OFFERS' },
                    channels: { type: 'array', items: { type: 'string', example: 'IN_APP' } },
                    priority: { type: 'string', example: 'HIGH' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Notification dispatched to queue.' },
          },
        },
      },
    },
  };