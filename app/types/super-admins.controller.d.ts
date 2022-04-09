export interface CreateSuperAdminsParams {
  name: string;
  email: string;
  role: string;
  password: string;
}

export interface UpdateSuperAdminsParams {
  name: string;
  email: string;
  role: string;
  encrypted_password: string;
}
