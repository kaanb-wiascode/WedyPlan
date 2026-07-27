export const ENTERPRISE_MEDIA_OPENAPI_SPEC = {
    openapi: '3.0.0',
    info: {
      title: 'WedyPlan Enterprise File & Media Platform API',
      version: '3.0.0',
      description: 'Centralized multi-provider cloud storage and image optimization service.',
    },
    paths: {
      '/api/v1/media/presigned-url': {
        post: {
          summary: 'Generate Direct S3/R2 Presigned Upload URL',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    ownerId: { type: 'string' },
                    fileName: { type: 'string', example: 'wedding_photo.jpg' },
                    mimeType: { type: 'string', example: 'image/jpeg' },
                    fileSizeBytes: { type: 'number', example: 4500000 },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Presigned upload URL generated successfully.' },
            400: { description: 'Quota exceeded or invalid payload.' },
          },
        },
      },
    },
  };