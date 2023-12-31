import React, {FC} from 'react';
import {Image, Pressable, Text} from 'native-base';

import Config from '../../../config';

type Props = {
  index: number;
  productName: string;
  productImage: String;
  onPress: () => void;
};

export const SnacksCard: FC<Props> = ({
  index,
  productImage,
  productName,
  onPress,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      my={4}
      alignItems={'center'}
      mr={4}
      ml={index === 0 ? 4 : 0}>
      <Image
        borderRadius={8}
        source={{uri: Config.API_URL + productImage}}
        alt={'no img'}
        resizeMode={'cover'}
        size={'md'}
      />
      <Text bold color={'secondary.300'}>
        {productName}
      </Text>
    </Pressable>
  );
};
