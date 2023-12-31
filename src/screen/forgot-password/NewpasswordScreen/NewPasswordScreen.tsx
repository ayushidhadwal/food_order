import React, {FC} from 'react';
import {FormikHelpers} from 'formik';

import {AuthStackScreenProps} from '../../../navigation/types';
import {AuthLayout} from '../../auth/LoginScreen/components/AuthLayout';
import {
  NewpasswordForm,
  NewPasswordFormValues,
} from './components/NewpasswordForm';
import {ResetPassword} from '../../../services';
import {ErrMessage, SuccessMessage} from '../../../utils/toastMessages';

type Props = AuthStackScreenProps<'NewPassword'>;

const NewPasswordScreen: FC<Props> = ({navigation, route}: Props) => {
  const {email, otp} = route.params;

  const onSubmit = async (
    values: NewPasswordFormValues,
    {setSubmitting, resetForm}: FormikHelpers<any>,
  ) => {
    try {
      await ResetPassword({
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
        otp: otp,
        email: email,
      });
      setSubmitting(false);
      resetForm();
      SuccessMessage('Password updated successfully!');
      navigation.navigate('Login');
    } catch (e: any) {
      setSubmitting(false);
      ErrMessage(e.message);
    }
  };

  return (
    <AuthLayout
      heading={'New Password'}
      subHeading={'Please enter your new password'}>
      <NewpasswordForm onSubmit={onSubmit} />
    </AuthLayout>
  );
};

export default NewPasswordScreen;
