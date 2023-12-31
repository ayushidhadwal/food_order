import React, {
  createContext,
  FC,
  PropsWithChildren,
  Reducer,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import {storage} from '../../utils/storage';
import Config from '../../config';

interface AuthContextState {
  isLoading: boolean;
  accessToken: string | null;
  expireIn: number | null;
  tokenType: string | null;
  createdAt: string | null;
}

interface AuthAction {
  type: AuthActionTypes;
  payload: AuthActionPayload;
}

interface AuthContextProps {
  state: AuthContextState;
  login: (
    accessToken: string,
    expireIn: number,
    tokenType: string,
    createdAt: string,
  ) => void;
  logout: () => void;
}

export enum AuthActionTypes {
  RESTORE_TOKEN = 'RESTORE_TOKEN',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

interface AuthActionPayload {
  accessToken: string | null;
  expireIn: number | null;
  tokenType: string | null;
  createdAt: string | null;
}

const initialState: AuthContextState = {
  isLoading: true,
  accessToken: null,
  expireIn: null,
  tokenType: null,
  createdAt: null,
};

const authReducer: Reducer<AuthContextState, AuthAction> = (state, action) => {
  switch (action.type) {
    case AuthActionTypes.RESTORE_TOKEN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        expireIn: action.payload.expireIn,
        tokenType: action.payload.tokenType,
        createdAt: action.payload.createdAt,
        isLoading: false,
      };
    case AuthActionTypes.SIGN_IN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        expireIn: action.payload.expireIn,
        tokenType: action.payload.tokenType,
        createdAt: action.payload.createdAt,
      };
    case AuthActionTypes.SIGN_OUT:
      return {
        ...state,
        accessToken: null,
        expireIn: null,
        tokenType: null,
        createdAt: null,
      };
  }
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider: FC<PropsWithChildren> = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const restoreSession = useCallback(() => {
    const userObject = storage.getString(Config.USER_SESSION);

    if (userObject) {
      const user = JSON.parse(userObject);
      dispatch({
        type: AuthActionTypes.RESTORE_TOKEN,
        payload: {
          accessToken: user.accessToken,
          expireIn: user.expireIn,
          tokenType: user.tokenType,
          createdAt: user.createdAt,
        },
      });
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const login = useCallback(
    (
      accessToken: string,
      expireIn: number,
      tokenType: string,
      createdAt: string,
    ): void => {
      if (accessToken && expireIn && tokenType && createdAt) {
        dispatch({
          type: AuthActionTypes.SIGN_IN,
          payload: {
            accessToken: accessToken,
            expireIn: expireIn,
            tokenType: tokenType,
            createdAt: createdAt,
          },
        });
        const token = {
          accessToken: accessToken,
          expireIn: expireIn,
          tokenType: tokenType,
          createdAt: createdAt,
        };
        storage.set(Config.USER_SESSION, JSON.stringify(token));
      } else {
        throw new Error('Session ID is required!');
      }
    },
    [],
  );

  const logout = useCallback(() => {
    dispatch({
      type: AuthActionTypes.SIGN_OUT,
      payload: {
        accessToken: null,
        expireIn: null,
        tokenType: null,
        createdAt: null,
      },
    });
    storage.delete(Config.USER_SESSION);
  }, []);

  const value = {state, logout, login};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
