import React, {FC, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FormikHelpers} from 'formik';

import {ProfileForm} from './components/ProfileForm';
import {ProfileFormValues, UpdateUserProfile} from '../../../services';
import {RootStackScreenProps} from '../../../navigation/types';
import {ErrMessage, SuccessMessage} from '../../../utils/toastMessages';
import {Messages} from '../../../constants';

type Props = RootStackScreenProps<'Profile'>;

export const ProfileScreen: FC<Props> = ({navigation}) => {
  const onSubmit = useCallback(
    async (values: ProfileFormValues, {setSubmitting}: FormikHelpers<any>) => {
      try {
        const result = await UpdateUserProfile(values);
        if (result) {
          navigation.goBack();
          SuccessMessage(Messages.ProfileUpdate);
        }
      } catch (e: any) {
        ErrMessage(e.message);
      } finally {
        setSubmitting(false);
      }
    },
    [navigation],
  );

  return (
    <SafeAreaView
      edges={['bottom']}
      style={{flex: 1, backgroundColor: 'white', padding: 15}}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <ProfileForm onSubmit={onSubmit} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
