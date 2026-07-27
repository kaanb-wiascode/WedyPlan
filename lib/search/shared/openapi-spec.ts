export const ENTERPRISE_SEARCH_OPENAPI_SPEC = {
    openapi: '3.0.0',
    info: {
      title: 'WedyPlan Universal Search Platform API',
      version: '3.0.0',
      description: 'Enterprise Hybrid Search Engine covering 15 sources with OpenSearch compatibility.',
    },
    paths: {
      '/api/v1/search/query': {
        post: {
          summary: 'Execute Hybrid Keyword & Vector Search',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    query: { type: 'string', example: 'kır bahçesi istanbul' },
                    portalContext: { type: 'string', enum: ['PUBLIC', 'COUPLE', 'VENDOR', 'ADMIN'] },
                    searchType: { type: 'string', example: 'HYBRID' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Search hits and facets returned successfully.' },
          },
        },
      },
    },
  };