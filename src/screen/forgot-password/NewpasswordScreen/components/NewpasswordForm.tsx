import React, {FC} from 'react';
import * as Yup from 'yup';
import {Formik, FormikHelpers} from 'formik';
import {Button, Box} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {FormInput} from '../../../../components/common/FormInput';

export type NewPasswordFormValues = {
  newPassword: string;
  confirmPassword: string;
};

type Props = {
  onSubmit: (
    values: NewPasswordFormValues,
    formikHelpers: FormikHelpers<any>,
  ) => void;
};

export const NewpasswordForm: FC<Props> = ({onSubmit}: Props) => {
  const initialValues: NewPasswordFormValues = {
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string().required('New Password is required!'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      'Passwords must match!',
    ),
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
              isInvalid={touched.newPassword && 'newPassword' in errors}
              onChangeText={handleChange('newPassword')}
              placeholder="New Password"
              error={errors?.newPassword}
              onBlur={handleBlur('newPassword')}
              value={values.newPassword}
              icon={Ionicons}
              iconName={'md-lock-closed'}
              secureTextEntry={true}
            />
            <FormInput
              isRequired={true}
              isInvalid={touched.confirmPassword && 'confirmPassword' in errors}
              onChangeText={handleChange('confirmPassword')}
              placeholder="Confirm Password"
              error={errors?.confirmPassword}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              icon={Ionicons}
              iconName={'md-lock-closed'}
              secureTextEntry={true}
            />
            <Button
              variant={'solid'}
              w={'100%'}
              size={'lg'}
              colorScheme={'primary'}
              mt={10}
              isLoading={isSubmitting}
              disabled={isSubmitting}
              onPress={handleSubmit}>
              Update
            </Button>
          </Box>
        );
      }}
    </Formik>
  );
};
