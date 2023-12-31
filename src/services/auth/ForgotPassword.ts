import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {ForgotPasswordValues} from './types';

export const ForgotPassword = async ({
  email,
}: ForgotPasswordValues): Promise<number> => {
  const response = await Axios.post(ApiEndpoints.auth.forgotPassword, {
    email: email,
  });

  const {status, message, Data} = response.data;
  if (status) {
    return Number(Data.otp);
  } else {
    throw new Error(message);
  }
};
