import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {LoginFormValues, VerifyLoginResponse} from './types';

export const Login = async (
  loginCredentials: LoginFormValues,
): Promise<VerifyLoginResponse> => {
  const {email, password} = loginCredentials;

  const response = await Axios.post(ApiEndpoints.auth.login, {
    email: email,
    password: password,
  });

  const data = response.data;

  return {
    accessToken: data?.access_token,
    expireIn: data?.expires_in,
    tokenType: data?.token_type,
    createdAt: data?.user?.created_at,
  };
};
