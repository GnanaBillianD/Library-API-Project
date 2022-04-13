const sendResetPasswordRouterOpts = {
  schema: {
    description: 'send password reset instruction',
    body: {
      type: 'object',
      required: ['email'],
      properties: {
        email: { type: 'string' }
      }
    },
    response: {
      200: {
        description: 'Successfully send reset instruction',
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      },
      500: {
        description: 'Something went worng',
        type: 'object',
        properties: {
          errors: { type: 'array', items: { type: 'string' } }
        }
      }
    }
  }
};

export default sendResetPasswordRouterOpts;
