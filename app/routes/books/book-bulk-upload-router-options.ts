const uploadBulkRouterOpts = {
  schema: {
    summary: 'upload file',
    body: {
      type: 'object',
      properties: {
        file: { type: 'object' }
      },
      required: ['file']
    }
  }
};
export default uploadBulkRouterOpts;
