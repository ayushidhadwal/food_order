import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, StyleSheet} from 'react-native';

import {RootStackScreenProps} from '../../../navigation/types';
import {Loader} from '../../../components/common/Loader';
import {useAddressList} from '../../../hooks/address';
import {AddressDTO} from '../../../services';
import {AddressCard} from './components/AddressCard';
import {EmptyAddress} from '../../address/AddressScreen/components/EmptyAddress';

type Props = RootStackScreenProps<'ChooseAddress'>;

export const ChooseAddressScreen: FC<Props> = ({navigation, route}: Props) => {
  const totalPrice: number = route.params.totalPrice;

  const {isLoading, addressList} = useAddressList();

  const addAddress = () => navigation.navigate('NewAddress');

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.screen}>
      <FlatList
        data={addressList}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.addressId)}
        ListEmptyComponent={<EmptyAddress onPress={addAddress} />}
        renderItem={({item}: {item: AddressDTO}) => (
          <AddressCard
            id={item.addressId}
            userHouse={item.userHouse}
            userApartment={item.userApartment}
            userStreet={item.userStreet}
            crossStreet={item.crossStreet}
            userCity={item.userCity}
            userState={item.userState}
            onPressHandler={() =>
              navigation.navigate('Checkout', {
                totalPrice: totalPrice,
                addressId: item.addressId,
              })
            }
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
