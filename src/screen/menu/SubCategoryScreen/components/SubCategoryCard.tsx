import {Box, Image, Pressable, Text} from 'native-base';
import React, {FC} from 'react';
import {Dimensions} from 'react-native';
import Config from '../../../../config';

type Props = {
  id: number;
  index: number;
  subCategoryName: string;
  subCategoryImage: string;
  onPressHandler: () => void;
};
const WIDTH = Dimensions.get('screen').width;

export const SubCategoryCard: FC<Props> = ({
  index,
  subCategoryImage,
  subCategoryName,
  onPressHandler,
}: Props) => {
  return (
    <Pressable
      onPress={onPressHandler}
      w={WIDTH}
      h={200}
      mb={1}
      mt={index === 0 ? 5 : 0}>
      <Image
        source={{uri: Config.API_URL + subCategoryImage}}
        w={'100%'}
        height={'100%'}
        resizeMode={'cover'}
        alt={'img'}
      />
      <Box position={'absolute'} bottom={5} left={5}>
        <Text fontWeight={'700'} color={'white'} fontSize={'md'}>
          {subCategoryName}
        </Text>
      </Box>
    </Pressable>
  );
};
