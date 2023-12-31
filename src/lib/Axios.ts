import axios, {AxiosHeaders} from 'axios';
import Config from '../config';
import {ApiEndpoints} from '../services';
import {storage} from '../utils/storage';

export const Axios = axios.create({
  baseURL: Config.API_URL,
});

const refreshAxiosInstance = axios.create({
  baseURL: Config.API_URL,
});

const refreshToken = () => {
  console.log('12345678');
  return refreshAxiosInstance
    .post(ApiEndpoints.tokenUrl.refreshToken)
    .then(({data}) => {
      console.log('ertyui');
      // localStorage.setItem('token', data.token);
      // localStorage.setItem('refreshToken', data.refreshToken);
      console.log('data', typeof data, data);
      // storage.set(Config.USER_SESSION, JSON.stringify(data));
      return Promise.resolve(data.token);
    })
    .catch(error => Promise.reject(error));
};

const authRoutes: string[] = [];
for (const property in ApiEndpoints.auth) {
  authRoutes.push(
    ApiEndpoints.auth[property as keyof typeof ApiEndpoints.auth],
  );
}

Axios.interceptors.request.use(
  async function (config) {
    if (!config) {
      config = {};
    }
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }
    const accessTokenRequired = !authRoutes.find(route => route === config.url);

    const userObject = storage.getString(Config.USER_SESSION);

    let accessToken = null;
    let tokenType = null;

    if (userObject) {
      const user = JSON.parse(userObject);
      if (user.accessToken && user.tokenType && accessTokenRequired) {
        accessToken = String(user.accessToken);
        tokenType = String(user.tokenType);
      }

      if (config.headers instanceof AxiosHeaders) {
        config.headers.set(
          'Authorization',
          `${tokenType} ${accessToken}+'hdbgkjbk'`,
        );
        config.headers.set('Accept', 'application/json');
      }
    }
      console.log('url',config.url);

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Axios.interceptors.response.use(
//   response => {
//     return response;
//   },
Axios.interceptors.response.use(
  response => response,
  error => {
    const {config} = error;

    if (error.response && error.response.data) {
      const data = error.response.data.error;

      console.log('error', error);

      if (error.response.status === 401) {
        // return Promise.reject(new Error(data));
        // if (status === 401) {
        return refreshToken()
          .then(token => {
            // if (config.headers instanceof AxiosHeaders) {
            //   config.headers.set(
            //     'Authorization',
            //     `${token.tokenType} ${token.accessToken}`,
            //   );
            console.log('qwertyui');
            config.headers.Authorization = `Bearer ${token}`;
            return Axios(config);
            // }
          })
          .catch(err => Promise.reject(err));
        // }
      }

      if (error.response.status === 400) {
        const apiErr = JSON.parse(error.response.data);

        return Promise.reject(
          new Error(Object.values(apiErr as keyof string)[0][0]),
        );
      }
    }
    return Promise.reject(error);
  },
);
