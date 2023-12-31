import React, {FC, useCallback} from 'react';
import {Box} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FormikHelpers} from 'formik';

import {AddressForm} from '../EditAddressScreen/components/AddressForm';
import {RootStackScreenProps} from '../../../navigation/types';
import {AddressFormValues} from '../../../services';
import {ErrMessage, SuccessMessage} from '../../../utils/toastMessages';
import {Messages} from '../../../constants';
import {AddNewAddress} from '../../../services';
import {useAddressList} from '../../../hooks/address';
import {Loader} from '../../../components/common/Loader';

type Props = RootStackScreenProps<'NewAddress'>;

export const NewAddressScreen: FC<Props> = ({navigation}: Props) => {
  const {isLoading, addressList, mutate} = useAddressList();

  const onSubmit = useCallback(
    async (
      values: AddressFormValues,
      {resetForm, setSubmitting}: FormikHelpers<any>,
    ) => {
      try {
        const result = await AddNewAddress(values);
        if (addressList) {
          await mutate([result, ...addressList]);
          resetForm();
          SuccessMessage(Messages.AddAddress);
          navigation.goBack();
        }
      } catch (e: any) {
        ErrMessage(e.message);
      } finally {
        setSubmitting(false);
      }
    },
    [addressList, mutate, navigation],
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box flex={1} p={2}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <AddressForm onSubmit={onSubmit} />
      </KeyboardAwareScrollView>
    </Box>
  );
};
