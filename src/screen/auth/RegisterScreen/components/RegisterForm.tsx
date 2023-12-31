import React, {FC} from 'react';
import * as Yup from 'yup';
import {Formik, FormikHelpers} from 'formik';
import {Text, Button, Box} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {FormInput} from '../../../../components/common/FormInput';
import {AuthNavigationProps} from '../../../../navigation/types';
import {RegisterFormValues} from '../../../../services';

type Props = {
  onSubmit: (
    values: RegisterFormValues,
    formikHelpers: FormikHelpers<any>,
  ) => void;
};

export const RegisterForm: FC<Props> = ({onSubmit}: Props) => {
  const navigation = useNavigation<AuthNavigationProps>();
  const initialValues: RegisterFormValues = {
    name: '',
    password: '',
    passwordConfirmation: '',
    email: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    password: Yup.string().required('Password is required!'),
    email: Yup.string().email('Invalid Email!').required('Email is required!'),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match',
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
              isInvalid={touched.name && 'name' in errors}
              onChangeText={handleChange('name')}
              placeholder="Your name"
              error={errors?.name}
              onBlur={handleBlur('name')}
              value={values.name}
              icon={MaterialIcons}
              iconName={'person'}
            />
            <FormInput
              isRequired={true}
              isInvalid={touched.email && 'email' in errors}
              onChangeText={handleChange('email')}
              placeholder="Your email"
              error={errors?.email}
              onBlur={handleBlur('email')}
              value={values.email}
              icon={Ionicons}
              iconName={'md-mail'}
            />
            <FormInput
              isRequired={true}
              isInvalid={touched.password && 'password' in errors}
              onChangeText={handleChange('password')}
              placeholder="Your Password"
              error={errors?.password}
              onBlur={handleBlur('password')}
              value={values.password}
              icon={Ionicons}
              iconName={'lock-closed-outline'}
              secureTextEntry={true}
            />
            <FormInput
              isRequired={true}
              isInvalid={
                touched.passwordConfirmation && 'passwordConfirmation' in errors
              }
              onChangeText={handleChange('passwordConfirmation')}
              placeholder=" Confirmed password"
              error={errors?.passwordConfirmation}
              onBlur={handleBlur('passwordConfirmation')}
              value={values.passwordConfirmation}
              icon={Ionicons}
              iconName={'md-lock-closed'}
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
              Sign Up
            </Button>
            <Text textAlign={'center'} mt={8} mb={8} fontWeight={'500'}>
              Already have an account?{' '}
              <Text
                color={'secondary.400'}
                fontWeight={'700'}
                onPress={() => navigation.navigate('Login')}>
                Sign In
              </Text>
            </Text>
          </Box>
        );
      }}
    </Formik>
  );
};
