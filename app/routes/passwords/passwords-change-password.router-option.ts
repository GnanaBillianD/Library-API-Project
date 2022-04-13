import { secureErrors } from '../shared-schema/secure-error.schema';
import { headers } from '../shared-schema/auth-header.schema'

const changePasswordRouterOpts = {
  schema: {
    headers,
    description: 'change password',
    body: {
      type: 'object',
      required: ['password', 'current_password', 'password_confirmation'],
      properties: {
        current_password: { type: 'string' },
        password: { type: 'string' },
        password_confirmation: { type: 'string' }
      }
    },
    response: {
      200: {
        description: 'Password has been changed successfully',
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          email: { type: 'string' },
          role: { type: 'string' }
        }
      },
      ...secureErrors
    }
  }
};

export default changePasswordRouterOpts;
