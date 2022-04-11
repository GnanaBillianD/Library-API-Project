export interface ResetPasswordParams {
  password: string;
  password_confirmation: string;
}

export interface ChangePasswordParams {
  password: string;
  current_password: string;
  password_confirmation: string;
}
