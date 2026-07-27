export const IDENTITY_OPENAPI_SPEC = {
    openapi: '3.0.0',
    info: {
      title: 'WedyPlan Identity & Authentication Core API',
      version: '3.0.0',
      description: 'Enterprise OAuth2/OIDC compliant shared authentication service.',
    },
    paths: {
      '/api/v1/auth/login': {
        post: {
          summary: 'Authenticate with Email & Argon2id Password',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'user@wedyplan.com' },
                    password: { type: 'string', example: 'SecurePassword123!' },
                    portalContext: { type: 'string', enum: ['PUBLIC', 'COUPLE', 'VENDOR', 'ADMIN'] },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Authenticated successfully. Tokens set in HttpOnly cookies.' },
            401: { description: 'Invalid credentials.' },
            429: { description: 'Rate limit exceeded.' },
          },
        },
      },
      '/api/v1/auth/refresh-token': {
        post: {
          summary: 'Rotate Refresh Token and Issuance of New Access Token',
          responses: {
            200: { description: 'Token rotated successfully.' },
            401: { description: 'Token family compromised or expired.' },
          },
        },
      },
    },
  };