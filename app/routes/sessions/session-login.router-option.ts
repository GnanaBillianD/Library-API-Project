const loginRouterOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' }
      }
    },
    response: {
      200: {
        description: 'Successfully logged in',
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  }
};

export default loginRouterOpts;
