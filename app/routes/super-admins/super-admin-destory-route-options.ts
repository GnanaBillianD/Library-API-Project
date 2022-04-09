const destorySuperAdminOpts = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  };
  
  export default destorySuperAdminOpts;
  