const resetPasswordRouterOpts = {
  schema: {
    headers: {
      description: 'bearer token ',
      type: 'object',
      properties: {
        Authorization: { type: 'string' }
      }
    },
    description: 'reset password',
    body: {
      type: 'object',
      required: ['password', 'password_confirmation'],
      properties: {
        password: { type: 'string' },
        password_confirmation: { type: 'string' }
      }
    },
    response: {
      200: {
        description: 'Password has been reset successfully',
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          role: { type: 'string' },
          email: { type: 'string' }
        }
      }
    }
  }
};

export default resetPasswordRouterOpts;
