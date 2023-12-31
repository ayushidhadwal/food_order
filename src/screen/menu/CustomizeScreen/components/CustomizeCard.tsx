import React, {FC} from 'react';
import {Box, Divider, HStack, Image, Text} from 'native-base';
import Config from '../../../../config';

type Props = {
  id: number;
  productName: string;
  productDescription: string;
  productImage: string;
  productPrice: number;
  productSize: string;
  productType: string;
};

export const CustomizeCard: FC<Props> = ({
  productName,
  productDescription,
  productImage,
  productPrice,
  productSize,
  productType,
}: Props) => {
  return (
    <Box>
      <Image
        alt={'img'}
        source={{uri: Config.IMG_URL + '/' + productImage}}
        w={'100%'}
        h={180}
        resizeMode={'cover'}
        rounded={10}
      />
      <HStack justifyContent={'space-between'} mt={2}>
        <Text fontWeight={'600'} fontSize={'lg'} textAlign={'left'}>
          {productName}
        </Text>
        <Text
          fontWeight={'600'}
          fontSize={'lg'}
          textAlign={'left'}
          color={'primary.600'}>
          ₹ {productPrice}
        </Text>
      </HStack>
      <Text
        fontWeight={'400'}
        fontSize={'xs'}
        textAlign={'left'}
        numberOfLines={3}>
        {productDescription}
      </Text>
      <Text
        fontWeight={'400'}
        fontSize={'xs'}
        textAlign={'left'}
        numberOfLines={3}>
        Size- {productSize}
      </Text>
      <Text
        fontWeight={'400'}
        fontSize={'xs'}
        textAlign={'left'}
        numberOfLines={3}>
        Type- {productType}
      </Text>
      <Divider my={2} />
    </Box>
  );
};
