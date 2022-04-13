export const secureErrors = {
    401: {
      description: 'Your session has expired',
      type: 'object',
      properties: {
        errors: { type: 'array', items: { type: 'string' } }
      }
    },
    403: {
      description: 'You are not allowed to perform this action',
      type: 'object',
      properties: {
        errors: { type: 'array', items: { type: 'string' } }
      }
    },
    422: {
      description: 'Unprocessable entity',
      type: 'object',
      properties: {
        errors: { type: 'array', items: { type: 'string' } }
      }
    },
    500: {
      description: 'Something went wrong',
      type: 'object',
      properties: {
        errors: { type: 'array', items: { type: 'string' } }
      }
    }
  };
  