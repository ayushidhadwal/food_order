import React, {FC, useCallback} from 'react';
import {FormikHelpers} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {AuthLayout} from '../LoginScreen/components/AuthLayout';
import {RegisterForm} from './components/RegisterForm';
import {AuthStackScreenProps} from '../../../navigation/types';
import {Register, RegisterFormValues} from '../../../services';
import {Messages} from '../../../constants';
import {ErrMessage, SuccessMessage} from '../../../utils/toastMessages';

type Props = AuthStackScreenProps<'Register'>;

export const RegisterScreen: FC<Props> = ({navigation}) => {
  const onSubmit = useCallback(
    async (
      values: RegisterFormValues,
      {resetForm, setSubmitting}: FormikHelpers<any>,
    ) => {
      try {
        const result = await Register(values);
        if (result) {
          resetForm();
          SuccessMessage(Messages.Register);
          navigation.navigate('Login');
        }
      } catch (e: any) {
        ErrMessage(e.message);
      } finally {
        setSubmitting(false);
      }
    },
    [],
  );
  return (
    <AuthLayout heading={'Sign In'} subHeading={' Add your details to sign-in'}>
      <KeyboardAwareScrollView>
        <RegisterForm onSubmit={onSubmit} />
      </KeyboardAwareScrollView>
    </AuthLayout>
  );
};
