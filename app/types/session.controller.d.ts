export interface LoginBodyParams {
  email: string;
  password: string;
}

export interface LoginServiceParams {
  email: string;
  password: string;
}

export interface JwtTokenUserAttributes {
  email: string;
}

export interface JwtResetTokenUserAttributes {
  email: string;
}
