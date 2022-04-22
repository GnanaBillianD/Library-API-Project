import { headers } from "../shared-schema/auth-header.schema";

const loginRouterOpts = {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string' },
          password: { type: 'string' }
        }
      },
      response: {
        headers,
        200: {
          description: 'Successfully logged in',
          type: 'object',
          properties: {
            message: {type: 'string'}
          }
        }
      }
    }
  };
  
  export default loginRouterOpts;
  