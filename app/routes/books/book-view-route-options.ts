const viewBookOpts = {
  schema: {
    response: {
      201: {
        description: 'Successful response',
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
};
export default viewBookOpts;
