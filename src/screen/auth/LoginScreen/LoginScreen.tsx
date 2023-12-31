import React, {FC, useCallback, useContext} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {AuthLayout} from './components/AuthLayout';
import {LoginForm} from './components/LoginForm';
import {AuthStackScreenProps} from '../../../navigation/types';

import {AuthContext} from '../../../contexts/auth';
import {FormikHelpers} from 'formik';
import {Login, LoginFormValues} from '../../../services';
import {ErrMessage} from '../../../utils/toastMessages';

type Props = AuthStackScreenProps<'Login'>;

export const LoginScreen: FC<Props> = ({}) => {
  const {login} = useContext(AuthContext);

  const onSubmit = useCallback(
    async (
      values: LoginFormValues,
      {resetForm, setSubmitting}: FormikHelpers<any>,
    ) => {
      try {
        const result = await Login(values);
        resetForm();
        setSubmitting(false);
        login(
          result.accessToken,
          result.expireIn,
          result.tokenType,
          result.createdAt,
        );
      } catch (e: any) {
        setSubmitting(false);
        ErrMessage(e.message);
      }
    },
    [login],
  );

  return (
    <AuthLayout heading={'Sign In'} subHeading={' Add your details to sign-in'}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <LoginForm onSubmit={onSubmit} />
      </KeyboardAwareScrollView>
    </AuthLayout>
  );
};
