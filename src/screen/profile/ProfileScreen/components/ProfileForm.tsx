import React, {FC} from 'react';
import * as Yup from 'yup';
import {Formik, FormikHelpers} from 'formik';
import {Button, Box, Image, Icon, HStack, Text, Pressable} from 'native-base';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {launchImageLibrary} from 'react-native-image-picker';

import {FormInput} from '../../../../components/common/FormInput';
import {ProfileFormValues} from '../../../../services';
import {mobileNumberRegExp} from '../../../../utils/helpers';
import {useUserProfile} from '../../../../hooks/user';
import {Loader} from '../../../../components/common/Loader';
import Config from '../../../../config';
import {ErrMessage} from '../../../../utils/toastMessages';

type Props = {
  onSubmit: (
    values: ProfileFormValues,
    formikHelpers: FormikHelpers<any>,
  ) => void;
};

export const ProfileForm: FC<Props> = ({onSubmit}: Props) => {
  const {isLoading, profile} = useUserProfile();

  console.log(Config.IMG_URL + '/' + profile?.profileImg);

  const initialValues: ProfileFormValues = {
    name: profile?.name ? profile?.name : '',
    email: profile?.email ? profile?.email : '',
    phone: profile?.phone ? profile?.phone : '',
    userImg: profile?.profileImg
      ? {
          name: 'image.jpg',
          uri: `${Config.IMG_URL + '/' + profile?.profileImg}`,
          type: 'image/jpg',
        }
      : {
          name: 'image.jpg',
          uri: 'https://www.shareicon.net/data/128x128/2016/05/29/772558_user_512x512.png',
          type: 'image/jpg',
        },
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    email: Yup.string().email('Invalid Email!').required('Email is required!'),
    phone: Yup.string()
      .matches(mobileNumberRegExp, 'Phone number is not valid')
      .required('Mobile Number is required!'),
    //   userImg: Yup.string().required('Profile Picture is required!'),
  });

  if (isLoading) {
    return <Loader />;
  }

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
        setFieldValue,
      }) => {
        const choosePhotoFromLibrary = async () => {
          check(
            Platform.OS === 'ios'
              ? PERMISSIONS.IOS.PHOTO_LIBRARY
              : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          )
            .then(result => {
              switch (result) {
                case RESULTS.GRANTED:
                  _openImagePicker();
                  break;
                case RESULTS.UNAVAILABLE:
                  ErrMessage('Feature not available.');
                  break;
                case RESULTS.DENIED:
                  request(
                    Platform.OS === 'ios'
                      ? PERMISSIONS.IOS.PHOTO_LIBRARY
                      : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
                  ).then((requestResult: string) => {
                    if (requestResult === RESULTS.GRANTED) {
                      _openImagePicker();
                    }
                  });
                  break;
                case RESULTS.LIMITED:
                  _openImagePicker();
                  break;
                case RESULTS.BLOCKED:
                  ErrMessage('Permission Denied.');
                  openSettings().catch(() =>
                    ErrMessage('Unable to open settings'),
                  );
                  break;
              }
            })
            .catch(e => {
              ErrMessage(e.message);
            });
        };

        const _openImagePicker = async () => {
          const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
          });

          let img = {
            name: '',
            uri: '',
            type: '',
          };

          if ('assets' in result) {
            result.assets?.forEach(asset => {
              img = {
                name: asset.fileName as string,
                uri: asset.uri as string,
                type: asset.type as string,
              };
              setFieldValue('userImg', img);
            });
          }
        };
        return (
          <Box>
            <Box w={100} h={100} alignSelf={'center'} rounded={100}>
              <Image
                source={{uri: values.userImg.uri}}
                alt={'no image'}
                rounded={100}
                w={'100%'}
                h={'100%'}
              />
              <Pressable
                position={'absolute'}
                bottom={0}
                p={0.5}
                bg={'rgba(255,255,255,0.5)'}
                width={'100%'}
                alignItems={'center'}
                onPress={choosePhotoFromLibrary}>
                <Icon
                  as={Ionicons}
                  name={'camera'}
                  color={'gray.700'}
                  size={'sm'}
                />
              </Pressable>
            </Box>
            <HStack alignSelf={'center'} alignItems={'center'} my={2}>
              <Icon
                as={Ionicons}
                name={'ios-pencil-sharp'}
                color={'primary.600'}
                size={'xs'}
              />
              <Text color={'primary.600'} ml={1} fontSize={'xs'}>
                Edit Profile
              </Text>
            </HStack>
            <Text
              fontWeight={'600'}
              fontSize={'md'}
              mb={5}
              alignSelf={'center'}>
              Hi {values.name} !
            </Text>
            <FormInput
              isRequired={true}
              isInvalid={touched.name && 'name' in errors}
              onChangeText={handleChange('name')}
              placeholder="Your name"
              error={errors?.name}
              onBlur={handleBlur('name')}
              value={values.name}
              icon={Ionicons}
              iconName={'md-person'}
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
              isInvalid={touched.phone && 'phone' in errors}
              onChangeText={handleChange('phone')}
              placeholder={'Mobile Number'}
              error={errors?.phone}
              onBlur={handleBlur('phone')}
              value={values.phone}
              icon={FontAwesome5}
              iconName={'mobile-alt'}
            />
            <Button
              variant={'solid'}
              w={'100%'}
              size={'lg'}
              mt={5}
              mb={10}
              isLoading={isSubmitting}
              disabled={isSubmitting}
              onPress={handleSubmit}
              colorScheme={'primary'}>
              Save
            </Button>
          </Box>
        );
      }}
    </Formik>
  );
};
