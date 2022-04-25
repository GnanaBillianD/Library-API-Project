import { pagination } from '../shared-schema/pagination.schema';

const listBookOpts = {
  schema: {
    description: 'list books details',
    querystring: {
      type: 'object',
      properties: {
        q: { type: 'string' },
        page: { type: 'number' },
        per_page: { type: 'number' },
        name: { type: 'string' },
        category: { type: 'string' },
        author: { type: 'string' },
        amount: { type: 'number' },
        notes: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          pagination,
          book: {
            id: { type: 'number' },
            name: { type: 'string' },
            author: { type: 'string' },
            category: { type: 'string' },
            price: { type: 'number' },
            notes: { type: 'string' }
          }
        }
      }
    }
  }
};

export default listBookOpts;
