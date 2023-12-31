export type LoginFormValues = {
  email: string;
  password: string;
};

export interface RegisterFormValues {
  name: string;
  password: string;
  passwordConfirmation: string;
  email: string;
}

export type VerifyLoginResponse = {
  accessToken: string;
  expireIn: number;
  tokenType: string;
  createdAt: string;
};

export type ForgotPasswordValues = {
  email: string;
};

export type VerifyValues = {
  otp: string;
};

export type NewPasswordDTO = {
  newPassword: string;
  confirmPassword: string;
  email: string;
  otp: number;
};
