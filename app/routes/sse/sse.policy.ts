import { UserInstance } from '../../types';

export default class SSEPolicy {
  constructor(private currentUser: UserInstance) {}

  canConnect() {
    return !!this.currentUser;
  }
}
