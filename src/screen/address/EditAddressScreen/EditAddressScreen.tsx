import React, {FC} from 'react';
import {Box} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {AddressForm} from './components/AddressForm';
import {RootStackScreenProps} from '../../../navigation/types';
import {AddressFormValues, EditAddress} from '../../../services';
import {ErrMessage, SuccessMessage} from '../../../utils/toastMessages';
import {Messages} from '../../../constants';
import {useAddressList} from '../../../hooks/address';
import {Loader} from '../../../components/common/Loader';

type Props = RootStackScreenProps<'EditAddress'>;

export const EditAddressScreen: FC<Props> = ({navigation, route}: Props) => {
  const address = route.params;
  const {isLoading, addressList, mutate} = useAddressList();

  const onSubmit = async (values: AddressFormValues) => {
    try {
      const result = await EditAddress(Number(address.addressId), values);
      if (addressList) {
        const index = addressList.findIndex(
          a => Number(a.addressId) === Number(address.addressId),
        );
        if (index > -1) {
          addressList[index] = result;
        }
        await mutate([...addressList]);
        SuccessMessage(Messages.UpdateAddress);
        navigation.goBack();
      }
    } catch (e: any) {
      ErrMessage(e.message);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box flex={1} p={2}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <AddressForm
          onSubmit={onSubmit}
          userCity={address.userCity}
          userState={address.userState}
          userHouse={address.userHouse}
          userStreet={address.userStreet}
          userApartment={address.userApartment}
          crossStreet={address.crossStreet}
        />
      </KeyboardAwareScrollView>
    </Box>
  );
};
