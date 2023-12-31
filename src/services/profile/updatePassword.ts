import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {ChangePasswordValues} from './types';

export const updatePassword = async (
  values: ChangePasswordValues,
): Promise<ChangePasswordValues> => {
  const {currentPassword, newPassword, confirmPassword} = values;

  const response = await Axios.post(ApiEndpoints.user.updateUserPassword, {
    old_password: currentPassword,
    password: newPassword,
    password_confirmation: confirmPassword,
  });

  const {data, status, message} = response.data.status;
  if (status) {
    return {
      currentPassword: data.old_password,
      newPassword: data.password,
      confirmPassword: data.password_confirmation,
    };
  } else {
    throw new Error(message);
  }
};
