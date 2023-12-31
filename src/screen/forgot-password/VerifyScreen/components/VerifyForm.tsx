import React, {FC} from 'react';
import * as Yup from 'yup';
import {Formik, FormikHelpers} from 'formik';
import {Button, Box, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {AuthNavigationProps} from '../../../../navigation/types';
import {VerifyValues} from '../../../../services';
import OtpTextInput from './OTPTextImput';

type Props = {
  onSubmit: (values: VerifyValues, formikHelpers: FormikHelpers<any>) => void;
};

export const VerifyForm: FC<Props> = ({onSubmit}: Props) => {
  const navigation = useNavigation<AuthNavigationProps>();

  const initialValues: VerifyValues = {
    otp: '',
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.string().required('Otp is required!'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({isSubmitting, errors, handleChange, handleSubmit}) => {
        return (
          <Box mx={4}>
            <OtpTextInput
              isInvalid={!!errors.otp}
              numberOfInput={6}
              onChangeText={handleChange('otp')}
              autoFocus={true}
            />

            <Button
              onPress={handleSubmit}
              colorScheme={'primary'}
              size="lg"
              borderRadius="full"
              mt={6}
              variant={'solid'}
              w={'100%'}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}>
              Verify
            </Button>
          </Box>
        );
      }}
    </Formik>
  );
};
