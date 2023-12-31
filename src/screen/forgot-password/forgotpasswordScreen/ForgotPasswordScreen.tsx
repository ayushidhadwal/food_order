import React, {FC, useCallback} from 'react';

import {AuthLayout} from '../../auth/LoginScreen/components/AuthLayout';
import {ForgotPasswordForm} from './components/ForgotPasswordForm';
import {AuthStackScreenProps} from '../../../navigation/types';
import {ErrMessage, SuccessMessage} from '../../../utils/toastMessages';
import {FormikHelpers} from 'formik';
import {Messages} from '../../../constants';
import {ForgotPasswordValues} from '../../../services';
import {ForgotPassword} from '../../../services';

type Props = AuthStackScreenProps<'ForgotPassword'>;

const ForgotPasswordScreen: FC<Props> = ({navigation}: Props) => {
  const onSubmit = useCallback(
    async (
      values: ForgotPasswordValues,
      {resetForm, setSubmitting}: FormikHelpers<any>,
    ) => {
      try {
        const result = await ForgotPassword(values);
        console.log(result, 'result');
        if (result) {
          resetForm();
          SuccessMessage(Messages.Email);
          navigation.navigate('Verify', {email: values.email, otp: result});
        }
      } catch (e: any) {
        ErrMessage(e.message);
      } finally {
        setSubmitting(false);
      }
    },
    [navigation],
  );

  return (
    <AuthLayout
      heading={'Forgot Password'}
      subHeading={
        'Please enter your email to receive a link to create a new password via email'
      }>
      <ForgotPasswordForm onSubmit={onSubmit} />
    </AuthLayout>
  );
};

export default ForgotPasswordScreen;
