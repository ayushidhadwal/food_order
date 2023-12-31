import React, {FC} from 'react';
import * as Yup from 'yup';
import {Formik, FormikHelpers} from 'formik';
import {Text, Button, Box} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {FormInput} from '../../../../components/common/FormInput';
import {AuthNavigationProps} from '../../../../navigation/types';
import {LoginFormValues} from '../../../../services';

type Props = {
  onSubmit: (
    values: LoginFormValues,
    formikHelpers: FormikHelpers<any>,
  ) => void;
};

export const LoginForm: FC<Props> = ({onSubmit}: Props) => {
  const navigation = useNavigation<AuthNavigationProps>();

  const initialValues: LoginFormValues = {
    email: 'test@mail.com',
    password: '123456',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email!').required('Email is required!'),
    password: Yup.string().required('Password is required!'),
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
              icon={MaterialIcons}
              iconName={'person'}
            />
            <FormInput
              isRequired={true}
              isInvalid={touched.password && 'password' in errors}
              onChangeText={handleChange('password')}
              placeholder="Your password"
              error={errors?.password}
              onBlur={handleBlur('password')}
              value={values.password}
              icon={Ionicons}
              iconName={'md-mail'}
              secureTextEntry={true}
            />
            <Text
              fontWeight={'500'}
              textAlign={'right'}
              color={'secondary.400'}
              onPress={() => navigation.navigate('ForgotPassword')}
              mb={10}>
              Forgot Password?
            </Text>
            <Button
              variant={'solid'}
              w={'100%'}
              colorScheme={'primary'}
              isLoading={isSubmitting}
              disabled={isSubmitting}
              onPress={handleSubmit}>
              Sign In
            </Button>
            <Text textAlign={'center'} mt={8} mb={5} fontWeight={'500'}>
              Don't have an account?{' '}
              <Text
                color={'secondary.400'}
                fontWeight={'700'}
                onPress={() => navigation.navigate('Register')}>
                Sign Up
              </Text>
            </Text>
          </Box>
        );
      }}
    </Formik>
  );
};
