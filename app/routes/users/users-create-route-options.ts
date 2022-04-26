import { headers } from '../shared-schema/auth-header.schema';

const createUserOpts = {
  headers,
  body: {
    type: 'object',
    required: ['users'],
    properties: {
      user: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          role: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' }
        }
      }
    }
  },
  response: {
    headers,
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
};
export default createUserOpts;
