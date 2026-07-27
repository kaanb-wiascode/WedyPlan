export const UNIVERSAL_CALENDAR_OPENAPI_SPEC = {
    openapi: '3.0.0',
    info: {
      title: 'WedyPlan Universal Calendar & Scheduling Engine API',
      version: '3.0.0',
      description: 'Centralized conflict-free calendar and availability scheduling service.',
    },
    paths: {
      '/api/v1/calendar/events': {
        post: {
          summary: 'Create Calendar Event with Conflict Detection',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    ownerId: { type: 'string' },
                    title: { type: 'string', example: 'Düğün Salonu Tadım Randevusu' },
                    startTime: { type: 'string', example: '2026-08-15T10:00:00Z' },
                    endTime: { type: 'string', example: '2026-08-15T12:00:00Z' },
                    travelBufferBeforeMin: { type: 'number', example: 30 },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Event created successfully.' },
            409: { description: 'Conflict detected.' },
          },
        },
      },
    },
  };