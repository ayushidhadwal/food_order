import React, {FC, useCallback} from 'react';
import {FormikHelpers} from 'formik';
import {Keyboard} from 'react-native';

import {AuthStackScreenProps} from '../../../navigation/types';
import {AuthLayout} from '../../auth/LoginScreen/components/AuthLayout';
import {VerifyForm} from './components/VerifyForm';
import {ForgotPassword} from '../../../services';
import {VerifyValues} from '../../../services';
import OTPResend from './components/OTPResend';
import {useMessage} from '../../../hooks/useMessage';

type Props = AuthStackScreenProps<'Verify'>;

const VerifyScreen: FC<Props> = ({navigation, route}: Props) => {
  const {email, otp} = route.params;

  const setMessage = useMessage();

  const onOTPResend = useCallback(async () => {
    try {
      Keyboard.dismiss();
      const result = await ForgotPassword({email});
      setMessage('OTP sent!');
      navigation.navigate('Verify', {email, otp: result});
    } catch (e: any) {
      setMessage(e.message);
    }
  }, [email, setMessage, navigation]);

  const onFormSubmit = useCallback(
    ({otp: userOTP}: VerifyValues, {setSubmitting}: FormikHelpers<any>) => {
      Keyboard.dismiss();
      if (Number(userOTP) === Number(otp)) {
        setSubmitting(false);
        navigation.replace('NewPassword', {
          email,
          otp,
        });
      } else {
        setSubmitting(false);
        setMessage('Invalid OTP!');
      }
    },
    [otp, email, navigation, setMessage],
  );
  return (
    <AuthLayout
      heading={'We have sent an OTP to your Email'}
      subHeading={'Please check your email\ncontinue to reset your password'}>
      <VerifyForm onSubmit={onFormSubmit} />
      <OTPResend onOTPResend={onOTPResend} />
    </AuthLayout>
  );
};

export default VerifyScreen;
