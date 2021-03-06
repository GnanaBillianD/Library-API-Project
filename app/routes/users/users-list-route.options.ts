const listUserOpts = {
  schema: {
    response: {
      201: {
        description: 'Successful response',
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          role: { type: 'string' },
          email: { type: 'string' },
          encrypted_password: { type: 'string' },
          access_token: { type: 'string' },
          created_at: { type: 'string' },
          updated_at: { type: 'string' }
        }
      }
    }
  }
};
export default listUserOpts;
