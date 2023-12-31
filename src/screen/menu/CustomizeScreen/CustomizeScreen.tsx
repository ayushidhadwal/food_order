import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  Box,
  Button,
  Divider,
  HStack,
  IconButton,
  Pressable,
  Radio,
  ScrollView,
  Text,
} from 'native-base';
import {StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native-safe-area-context';

import {RootStackScreenProps} from '../../../navigation/types';
import {AddToCart} from '../../../services';
import {ErrMessage, SuccessMessage} from '../../../utils/toastMessages';
import {Messages} from '../../../constants';
import {CustomizeCard} from './components/CustomizeCard';
import {ProductExtra} from '../../../hooks/category';

type Props = RootStackScreenProps<'Customize'>;

type Topping = {
  id: string;
  options: Array<string>;
  selection: string;
};

export const CustomizeScreen: FC<Props> = ({route}: Props) => {
  const {
    id,
    productDescription,
    productExtra,
    productImage,
    productName,
    productPrice,
    productQuantity,
    productSize,
    productType,
  } = route.params;

  const [extraTopping, setExtraTopping] = useState<Topping[]>([]);
  const [index, setIndex] = useState<number>();
  const [visible, setVisible] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(
    productQuantity === 0 ? 1 : productQuantity,
  );

  useEffect(() => {
    if (productExtra) {
      let items = [];
      for (const productExtraKey in productExtra) {
        items.push({
          id: `${productExtraKey}`,
          selection: '',
          options: productExtra[productExtraKey],
        });
      }
      setExtraTopping(items);
    }
  }, [productExtra]);

  const _clickHandler = useCallback(async () => {
    setSubmitting(true);

    const obj: ProductExtra = {};
    extraTopping.forEach(elem => {
      let arr = [];
      if (elem.selection) {
        arr.push(elem.selection);
        obj[elem.id] = arr;
      }
    });

    try {
      const result = await AddToCart({
        id,
        quantity,
        productPrice,
        obj,
      });
      setSubmitting(false);
      if (result) {
        SuccessMessage(Messages.AddToCart);
      }
    } catch (e: any) {
      setSubmitting(false);
      ErrMessage(e.message);
    }
  }, [extraTopping, id, productPrice, quantity]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.screen}>
      <CustomizeCard
        id={id}
        productDescription={productDescription}
        productImage={productImage}
        productName={productName}
        productPrice={productPrice}
        productSize={productSize}
        productType={productType}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text fontWeight={'600'} fontSize={'md'} textAlign={'center'}>
          Choose Your Toppings
        </Text>
        {extraTopping.map((v: Topping, i: number) => (
          <Box my={2} key={v.id}>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <Text
                color={'primary.600'}
                fontWeight={'500'}
                fontSize={'md'}
                mb={1}>
                {v.id}
              </Text>
              {visible && index === i ? (
                <IconButton
                  colorScheme={'secondary'}
                  size={'sm'}
                  variant="solid"
                  _icon={{
                    as: AntDesign,
                    name: 'minus',
                    color: 'white',
                  }}
                  onPress={() => setVisible(false)}
                />
              ) : (
                <IconButton
                  colorScheme={'secondary'}
                  size={'sm'}
                  variant="solid"
                  _icon={{
                    as: Ionicons,
                    name: 'add',
                    color: 'white',
                  }}
                  onPress={() => {
                    setVisible(true);
                    setIndex(i);
                  }}
                />
              )}
            </HStack>
            {visible && index === i && (
              <Radio.Group
                name={'toppings'}
                value={v.selection}
                onChange={nextValue => {
                  setExtraTopping(prevState => {
                    prevState[i].selection = nextValue;
                    return [...prevState];
                  });
                }}>
                {v.options.map(r => (
                  <Radio value={r} size="sm" my={1} key={r}>
                    {r}
                  </Radio>
                ))}
              </Radio.Group>
            )}
          </Box>
        ))}
      </ScrollView>
      <Divider />
      <HStack
        py={3}
        alignItems={'center'}
        justifyContent={'space-between'}
        mb={2}>
        <HStack bg={'secondary.600'} alignItems={'center'} rounded={10}>
          <Pressable px={2} py={1} onPress={() => setQuantity(quantity + 1)}>
            <Ionicons name={'add'} size={20} color={'white'} />
          </Pressable>
          <Text color={'white'} px={2}>
            {quantity}
          </Text>
          <Pressable
            px={2}
            py={1}
            rounded={10}
            onPress={() => (quantity === 1 ? null : setQuantity(quantity - 1))}>
            <AntDesign name="minus" size={20} color="white" />
          </Pressable>
        </HStack>
        <Button
          isLoading={submitting}
          isDisabled={submitting}
          onPress={_clickHandler}>
          Add to Cart
        </Button>
      </HStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});
