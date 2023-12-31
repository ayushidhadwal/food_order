import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  Button,
  Divider,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Modal,
  Radio,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {RootStackScreenProps} from '../../../navigation/types';
import {useAddressList} from '../../../hooks/address';
import {AddressDTO} from '../../../services';
import {Loader} from '../../../components/common/Loader';
import {useGetCartList} from '../../../hooks/cart';
import {ErrMessage} from '../../../utils/toastMessages';
import {Checkout} from '../../../services/checkout';

type Props = RootStackScreenProps<'Checkout'>;

export const CheckoutScreen: FC<Props> = ({navigation, route}: Props) => {
  const {totalPrice, addressId} = route.params;

  const {isLoading: load, cartList} = useGetCartList();
  const {isLoading, addressList} = useAddressList();

  const [notes, setNotes] = useState<boolean>(false);
  const [payment, setPayment] = useState<string>('Online');
  const [instruction, setInstruction] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<AddressDTO>({
    addressId: 0,
    crossStreet: '',
    userApartment: '',
    userCity: '',
    userHouse: '',
    userState: '',
    userStreet: '',
  });

  useEffect(() => {
    if (addressList) {
      const address = addressList.findIndex(
        i => Number(i.addressId) === Number(addressId),
      );
      if (address > -1) {
        setLocation(addressList[address]);
      }
    }
  }, [addressId, addressList]);

  const onClickHandler = useCallback(async () => {
    setLoading(true);
    try {
      const result = await Checkout({
        totalPrice,
        addressId,
        instruction,
        payment,
      });
      if (result) {
        setShowModal(true);
      }
    } catch (e: any) {
      ErrMessage(e.message);
    } finally {
      setLoading(false);
    }
  }, [addressId, instruction, payment, totalPrice]);

  if (isLoading || load) {
    return <Loader />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bgColor={'white'}
      flex={1}
      p={5}>
      <KeyboardAwareScrollView>
        {/* Address Card */}
        <HStack>
          <Entypo name="location-pin" size={22} color="red" />
          <Text numberOfLines={4} color={'gray.400'}>
            <Text fontWeight={'500'}>Address : </Text>
            {location.userHouse +
              ', ' +
              location.userApartment +
              ', ' +
              location.userStreet +
              ', ' +
              location.crossStreet +
              ', ' +
              location.userCity +
              ', ' +
              location.userState}
          </Text>
        </HStack>
        {/* Address Card */}
        {/* CartList */}
        <VStack p={2} alignSelf={'center'} mt={6} bgColor={'gray.200'}>
          {cartList?.map(m => (
            <HStack
              p={1}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <Text
                fontSize={'sm'}
                w={'45%'}
                textAlign={'left'}
                numberOfLines={2}>
                {m.productName}
              </Text>
              <Text fontSize={'sm'} w={'20%'} textAlign={'center'}>
                {m.qty}
              </Text>
              <Text
                bold
                fontSize={'sm'}
                color={'secondary.300'}
                w={'35%'}
                textAlign={'right'}>
                ₹ {m.price}
              </Text>
            </HStack>
          ))}
        </VStack>
        <HStack mt={2} justifyContent={'space-between'} alignItems={'center'}>
          <Heading fontSize={'md'}>Sub Total</Heading>
          <Text fontSize={'md'} bold color={'primary.300'}>
            ₹ {totalPrice}
          </Text>
        </HStack>
        <Divider my={1} alignSelf={'center'} />
        <HStack my={1.5} justifyContent={'space-between'} alignItems={'center'}>
          <Heading fontSize={'md'}>Grand Total</Heading>
          <Text fontSize={'xl'} bold color={'primary.300'}>
            ₹ {totalPrice}
          </Text>
        </HStack>
        <Divider my={1} alignSelf={'center'} />
        <HStack justifyContent={'space-between'} mt={4} alignItems={'center'}>
          <Heading fontSize={'md'}>Delivery Instructions</Heading>
          <Button
            size="sm"
            startIcon={<Icon as={Ionicons} name="md-add" size={5} />}
            variant={'ghost'}
            onPress={() => setNotes(!notes)}>
            Add Notes
          </Button>
        </HStack>
        {notes && (
          <Input
            variant="outline"
            placeholder="Enter your instructions"
            value={instruction}
            numberOfLines={70}
            bgColor={'gray.300:alpha.30'}
            focusOutlineColor={'secondary.300'}
            multiline={true}
            height={20}
            mb={3}
            onChangeText={text => setInstruction(text)}
          />
        )}
        <Divider my={1} alignSelf={'center'} />
        <Heading fontSize={'md'} mt={4}>
          Select Payment Mode
        </Heading>
        <Radio.Group
          name="paymentType"
          accessibilityLabel="payment type"
          value={payment}
          onChange={nextValue => {
            setPayment(nextValue);
          }}>
          <Radio value="Online" my={1} size={'sm'}>
            Online
          </Radio>
          <Radio value="COD" my={1} size={'sm'}>
            COD
          </Radio>
        </Radio.Group>
        <Button
          alignSelf={'center'}
          variant={'solid'}
          colorScheme={'primary'}
          size={'lg'}
          w={'90%'}
          h={12}
          mx={5}
          my={7}
          isLoading={loading}
          isDisabled={loading}
          onPress={onClickHandler}
          rounded={8}>
          Continue To Payment
        </Button>
        <Modal
          isOpen={showModal}
          size={'full'}
          onClose={() => setShowModal(false)}>
          <Modal.Content
            maxWidth="400px"
            position={'absolute'}
            bottom={0}
            borderBottomRadius={0}>
            <Modal.Body>
              <Image
                mt={3}
                alignSelf={'center'}
                source={require('../../../assets/modal.png')}
                alt={'no image'}
              />
              <Text bold fontSize={'xl'} textAlign={'center'} mt={3}>
                Thank You!
              </Text>
              <Text mt={2} ml={2} textAlign={'center'}>
                Your Order Placed successfully!!
              </Text>
              <Button
                alignSelf={'center'}
                variant={'solid'}
                colorScheme={'primary'}
                size={'lg'}
                w={'90%'}
                h={12}
                mx={5}
                my={7}
                rounded={8}
                onPress={() => navigation.navigate('Home')}
                startIcon={
                  <Icon as={FontAwesome} name="home" size={25} color="white" />
                }>
                Back To Home
              </Button>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};
