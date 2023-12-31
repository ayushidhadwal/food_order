import React, {FC, useCallback} from 'react';
import {FormikHelpers} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';

import {RootStackScreenProps} from '../../../navigation/types';
import {ChangePasswordValues, updatePassword} from '../../../services';
import {Messages} from '../../../constants';
import {ErrMessage, SuccessMessage} from '../../../utils/toastMessages';

import {ChangePasswordForm} from './components/ChangePasswordForm';

type Props = RootStackScreenProps<'ChangePassword'>;

export const ChangePasswordScreen: FC<Props> = ({navigation}) => {
  const onSubmit = useCallback(
    async (
      values: ChangePasswordValues,
      {resetForm, setSubmitting}: FormikHelpers<any>,
    ) => {
      try {
        const result = await updatePassword(values);
        if (result) {
          resetForm();
          SuccessMessage(Messages.password);
          navigation.goBack();
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
        <ChangePasswordForm onSubmit={onSubmit} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
