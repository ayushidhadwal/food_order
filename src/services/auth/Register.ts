import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {RegisterFormValues} from './types';

export const Register = async ({
  name,
  email,
  password,
  passwordConfirmation,
}: RegisterFormValues): Promise<boolean> => {
  const response = await Axios.post(ApiEndpoints.auth.register, {
    name: name,
    password: password,
    password_confirmation: passwordConfirmation,
    email: email,
  });

  const status = response.status;
  return status === 201;
};
