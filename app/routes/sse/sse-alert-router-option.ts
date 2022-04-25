import { headers } from '../shared-schema/auth-header.schema';
import { secureErrors } from '../shared-schema/secure-error-schema';

const sseAlertsRouterOpts = {
  schema: {
    query: {
      type: 'object',
      properties: {
        token: { type: 'string' }
      }
    },
    response: {
      headers,
      200: {
        description: 'List of all alerts',
        type: 'object'
      }
    },
    ...secureErrors
  }
};

export default sseAlertsRouterOpts;
