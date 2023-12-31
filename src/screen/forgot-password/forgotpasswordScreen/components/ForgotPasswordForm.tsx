import React, {FC} from 'react';
import * as Yup from 'yup';
import {Formik, FormikHelpers} from 'formik';
import {Button, Box} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {FormInput} from '../../../../components/common/FormInput';
import {ForgotPasswordValues} from '../../../../services';

type Props = {
  onSubmit: (
    values: ForgotPasswordValues,
    formikHelpers: FormikHelpers<any>,
  ) => void;
};

export const ForgotPasswordForm: FC<Props> = ({onSubmit}: Props) => {
  const initialValues: ForgotPasswordValues = {email: ''};

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email!').required('Email is required!'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({
        isSubmitting,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        values,
      }) => {
        return (
          <Box>
            <FormInput
              isRequired={true}
              isInvalid={touched.email && 'email' in errors}
              onChangeText={handleChange('email')}
              placeholder="Your email"
              error={errors?.email}
              onBlur={handleBlur('email')}
              value={values.email}
              icon={Ionicons}
              iconName={'mail-outline'}
            />

            <Button
              variant={'solid'}
              w={'100%'}
              size={'lg'}
              mt={6}
              colorScheme={'primary'}
              isLoading={isSubmitting}
              disabled={isSubmitting}
              onPress={handleSubmit}>
              Send
            </Button>
          </Box>
        );
      }}
    </Formik>
  );
};
