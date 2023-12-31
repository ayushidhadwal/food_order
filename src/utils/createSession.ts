import {VerifyLoginResponse} from '../services';
import * as Storage from './storage';
import Config from '../config';

export const createSession = async (accessToken: string, expireIn: number) => {
  const result: VerifyLoginResponse = {
    expireIn: Number(expireIn),
    accessToken: accessToken,
  };

  await Storage.save(Config.USER_SESSION, result);

  return result;
};
