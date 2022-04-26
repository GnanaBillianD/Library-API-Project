import { headers } from '../shared-schema/auth-header.schema';

const destoryUserOpts = {
  headers,
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
};

export default destoryUserOpts;
