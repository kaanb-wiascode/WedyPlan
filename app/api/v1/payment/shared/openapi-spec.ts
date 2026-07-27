export const ENTERPRISE_PAYMENT_OPENAPI_SPEC = {
    openapi: '3.0.0',
    info: {
      title: 'WedyPlan Enterprise Payment Platform API',
      version: '3.0.0',
      description: 'Multi-provider payment gateway, split-commission engine & idempotent webhook platform.',
    },
    paths: {
      '/api/v1/payment/initialize': {
        post: {
          summary: 'Initialize Payment Session or 3DS Checkout',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    userId: { type: 'string' },
                    amount: { type: 'number', example: 150000 },
                    provider: { type: 'string', enum: ['IYZICO', 'PAYTR', 'STRIPE'] },
                    idempotencyKey: { type: 'string', example: 'ik_98723498234' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Payment session initialized.' },
          },
        },
      },
    },
  };