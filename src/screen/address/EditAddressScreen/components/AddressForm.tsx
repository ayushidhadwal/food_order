import React, {FC} from 'react';
import {Box, Button} from 'native-base';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {AddressFormValues} from '../../../../services';
import {FormInput} from '../../../../components/common/FormInput';

type Props = {
  onSubmit: (
    values: AddressFormValues,
    formikHelpers: FormikHelpers<any>,
  ) => void;
  userCity?: string;
  userState?: string;
  userHouse?: string;
  userStreet?: string;
  userApartment?: string;
  crossStreet?: string;
};

export const AddressForm: FC<Props> = ({
  onSubmit,
  userCity,
  userState,
  userHouse,
  userStreet,
  userApartment,
  crossStreet,
}: Props) => {
  const initialValues: AddressFormValues = {
    userCity: userCity ? userCity : '',
    userState: userState ? userState : '',
    userHouse: userHouse ? userHouse : '',
    userStreet: userStreet ? userStreet : '',
    userApartment: userApartment ? userApartment : '',
    crossStreet: crossStreet ? crossStreet : '',
  };

  const authAddressSchema = Yup.object().shape({
    userHouse: Yup.string().required(),
    userApartment: Yup.string().required(),
    userStreet: Yup.string().required(),
    crossStreet: Yup.string().required(),
    userCity: Yup.string().required(),
    userState: Yup.string().required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={authAddressSchema}
      onSubmit={onSubmit}>
      {({
        isSubmitting,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
      }) => {
        return (
          <Box m={4}>
            <FormInput
              isRequired={true}
              isInvalid={touched.userHouse && 'userHouse' in errors}
              onChangeText={handleChange('userHouse')}
              placeholder="Enter House Number"
              error={errors?.userHouse}
              onBlur={handleBlur('userHouse')}
              value={values.userHouse}
              icon={Ionicons}
              iconName={'home'}
            />
            <FormInput
              isRequired={true}
              isInvalid={touched.userApartment && 'userApartment' in errors}
              onChangeText={handleChange('userApartment')}
              placeholder="Enter Apartment Number"
              error={errors?.userApartment}
              onBlur={handleBlur('userApartment')}
              value={values.userApartment}
              icon={FontAwesome}
              iconName={'building'}
            />
            <FormInput
              isRequired={true}
              isInvalid={touched.userStreet && 'userStreet' in errors}
              onChangeText={handleChange('userStreet')}
              placeholder="Enter Street"
              error={errors?.userStreet}
              onBlur={handleBlur('userStreet')}
              value={values.userStreet}
              icon={FontAwesome5}
              iconName={'road'}
            />
            <FormInput
              isRequired={true}
              isInvalid={touched.crossStreet && 'crossStreet' in errors}
              onChangeText={handleChange('crossStreet')}
              placeholder="Enter Cross Street"
              error={errors?.crossStreet}
              onBlur={handleBlur('crossStreet')}
              value={values.crossStreet}
              icon={MaterialIcons}
              iconName={'location-searching'}
            />
            <FormInput
              isRequired={true}
              isInvalid={touched.userCity && 'userCity' in errors}
              onChangeText={handleChange('userCity')}
              placeholder="Enter City"
              error={errors?.userCity}
              onBlur={handleBlur('userCity')}
              value={values.userCity}
              icon={MaterialIcons}
              iconName={'location-city'}
            />
            <FormInput
              isRequired={true}
              isInvalid={touched.userState && 'userState' in errors}
              onChangeText={handleChange('userState')}
              placeholder="Enter State"
              error={errors?.userState}
              onBlur={handleBlur('userState')}
              value={values.userState}
              icon={Ionicons}
              iconName={'md-location'}
            />
            <Button
              onPress={handleSubmit}
              colorScheme={'primary'}
              size="lg"
              borderRadius={5}
              mb={5}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}>
              {'Submit'}
            </Button>
          </Box>
        );
      }}
    </Formik>
  );
};
