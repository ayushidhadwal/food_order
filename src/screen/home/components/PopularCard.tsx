import React, {FC} from 'react';
import {HStack, Icon, Image, Pressable, Text} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

import Config from '../../../config';

type Props = {
  name: string;
  type: string;
  category: string;
  index: number;
  productImage: String;
  onPress: () => void;
};

export const PopularCard: FC<Props> = ({
  index,
  name,
  type,
  category,
  productImage,
  onPress,
}: Props) => {
  return (
    <Pressable onPress={onPress} mr={4} mb={12} ml={index === 0 ? 4 : 0}>
      <Image
        source={{uri: Config.API_URL + productImage}}
        alt={'img'}
        w={250}
        h={150}
        rounded={10}
        resizeMode={'cover'}
      />
      <Text fontWeight={'700'} my={0.5} color={'secondary.400'}>
        {name}
      </Text>
      <HStack alignItems={'center'}>
        <Text color={'muted.600'} fontWeight={'500'}>
          {type}
        </Text>
        <Icon as={Entypo} name={'dot-single'} color={'primary.400'} />
        <Text color={'muted.600'} fontWeight={'500'}>
          {category}
        </Text>
      </HStack>
    </Pressable>
  );
};
