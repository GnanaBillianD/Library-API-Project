import { headers } from '../shared-schema/auth-header.schema';

const uploadBulkConsumerRouterOpts = {
  schema: {
    headers,
    description:
      'Upload bulk consumers. Send the file in form-data with key as file and the Content-Type should be multipart/form-data',
    response: {
      headers,
      201: {
        description: 'consumers have been uploaded',
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  }
};

export default uploadBulkConsumerRouterOpts;
