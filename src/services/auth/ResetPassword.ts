import {ApiEndpoints} from '../ApiEndpoints';
import {NewPasswordDTO} from './types';
import {Axios} from '../../lib/Axios';

export const ResetPassword = async ({
  confirmPassword,
  newPassword,
  otp,
  email,
}: NewPasswordDTO): Promise<boolean> => {
  const response = await Axios.post(ApiEndpoints.auth.resetPassword, {
    email: email,
    otp: otp,
    new_password: newPassword,
    confirm_password: confirmPassword,
  });

  const {status, message} = response.data;

  if (status) {
    return true;
  } else {
    throw new Error(message);
  }
};
