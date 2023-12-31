import React, {FC} from 'react';
import * as Yup from 'yup';
import {Formik, FormikHelpers} from 'formik';
import {Button, Box} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {FormInput} from '../../../../components/common/FormInput';
import {ChangePasswordValues} from '../../../../services';

type Props = {
  onSubmit: (
    values: ChangePasswordValues,
    formikHelpers: FormikHelpers<any>,
  ) => void;
};

export const ChangePasswordForm: FC<Props> = ({onSubmit}: Props) => {
  const initialValues: ChangePasswordValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current Password is required!'),
    newPassword: Yup.string().required('New Password is required!'),
    confirmPassword: Yup.string().required('Confirm Password is required!'),
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
          <Box mt={5}>
            <FormInput
              isRequired={true}
              isInvalid={touched.currentPassword && 'currentPassword' in errors}
              onChangeText={handleChange('currentPassword')}
              placeholder="Enter Current Password"
              error={errors?.currentPassword}
              onBlur={handleBlur('currentPassword')}
              value={values.currentPassword}
              icon={Ionicons}
              iconName={'lock-closed-outline'}
            />
            <FormInput
              isRequired={true}
              isInvalid={touched.newPassword && 'newPassword' in errors}
              onChangeText={handleChange('newPassword')}
              placeholder="Enter Your New Password"
              error={errors?.newPassword}
              onBlur={handleBlur('newPassword')}
              value={values.newPassword}
              icon={Ionicons}
              iconName={'lock-closed'}
            />
            <FormInput
              isRequired={true}
              isInvalid={touched.confirmPassword && 'confirmPassword' in errors}
              onChangeText={handleChange('confirmPassword')}
              placeholder="Confirm Your New Password"
              error={errors?.confirmPassword}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              icon={Ionicons}
              iconName={'lock-closed'}
              secureTextEntry={true}
            />
            <Button
              isLoading={isSubmitting}
              disabled={isSubmitting}
              variant={'solid'}
              w={'100%'}
              size={'lg'}
              mt={5}
              colorScheme={'primary'}
              onPress={handleSubmit}>
              Update
            </Button>
          </Box>
        );
      }}
    </Formik>
  );
};
