import React, {FC} from 'react';
import {Fab, Icon} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatList, StyleSheet} from 'react-native';

import {AddressItem} from './components/AddressItem';
import {EmptyAddress} from './components/EmptyAddress';
import {RootStackScreenProps} from '../../../navigation/types';
import {Loader} from '../../../components/common/Loader';
import {useAddressList} from '../../../hooks/address';
import {AddressDTO, DeleteAddress} from '../../../services';

type Props = RootStackScreenProps<'Address'>;

export const AddressScreen: FC<Props> = ({navigation}: Props) => {
  const {isLoading, addressList, mutate} = useAddressList();

  const addAddress = () => navigation.navigate('NewAddress');

  const deleteAddress = async (addressId: number) => {
    try {
      const result = await DeleteAddress(addressId);
      if (result) {
        await mutate(
          addressList?.filter(
            address => Number(address.addressId) !== Number(addressId),
          ),
        );
      }
    } catch (e: any) {
      e?.message;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.screen}>
      <Fab
        placement="bottom-right"
        onPress={addAddress}
        size="md"
        bottom={10}
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="md" />}
        renderInPortal={false}
      />
      <FlatList
        data={addressList}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.addressId)}
        ListEmptyComponent={<EmptyAddress onPress={addAddress} />}
        renderItem={({item}: {item: AddressDTO}) => (
          <AddressItem
            id={item.addressId}
            userHouse={item.userHouse}
            userApartment={item.userApartment}
            userStreet={item.userStreet}
            crossStreet={item.crossStreet}
            userCity={item.userCity}
            userState={item.userState}
            deleteAddress={deleteAddress}
            editAddress={() => navigation.navigate('EditAddress', item)}
          />
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    marginVertical: 16,
  },
  screen: {
    flex: 1,
  },
});
