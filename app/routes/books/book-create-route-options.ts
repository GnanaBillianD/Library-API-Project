import { headers } from '../shared-schema/auth-header.schema';

const createBookOpts = {
  headers,
  body: {
    type: 'object',
    required: ['book'],
    properties: {
      book: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          author: { type: 'string' },
          category: { type: 'string' },
          amount: { type: 'number' },
          notes: { type: 'string' }
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
        author: { type: 'string' },
        category: { type: 'string' },
        amount: { type: 'number' },
        notes: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    }
  }
};
export default createBookOpts;
