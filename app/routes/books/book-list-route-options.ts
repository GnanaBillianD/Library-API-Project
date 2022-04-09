const listBookOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        response: {
          200: {
            type: 'object',
            properties: {
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
  }
};
export default listBookOpts