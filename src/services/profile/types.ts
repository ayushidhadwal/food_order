export type UserProfile = {
  id: number;
  name: string;
  email: string;
  profileImg: string;
  phone?: string;
  otpVerify?: string;
};

export type imgType = {
  name: string;
  uri: string;
  type: string;
};
export type ProfileFormValues = {
  name: string;
  email: string;
  phone: string;
  userImg: imgType;
};

export type ChangePasswordValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
export interface ProfileDTO {
  name: string;
  phone: string;
  email: string;
}
