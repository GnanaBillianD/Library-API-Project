import { UserInstance } from '../types';

export default class UserPolicy {
  constructor(private currentUser: UserInstance) {}

  canCreate() {
    return this.currentUser.isSuperAdmin();
  }

  canList() {
    return this.currentUser.isSuperAdmin();
  }

  canView() {
    return this.currentUser.isSuperAdmin();
  }

  canUpdate() {
    return this.currentUser.isSuperAdmin();
  }

  canDelete() {
    return this.currentUser.isSuperAdmin();
  }
  canCreateBooks() {
    return this.currentUser.isSuperAdmin();
  }
}
