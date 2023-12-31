import React from 'react';
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Image,
  Pressable,
  Text,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Config from '../../../../config';

type Props = {
  img: String;
  heading: string;
  onPress: () => void;
};

export const MenuCard: React.FC<Props> = ({img, heading, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      w={'78%'}
      bg={'white'}
      py={2}
      shadow={4}
      my={3}
      ml={2}
      borderTopLeftRadius={100}
      borderBottomLeftRadius={100}
      borderTopRightRadius={12}
      borderBottomRightRadius={12}>
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        <HStack alignItems={'center'}>
          <Image
            source={{uri: Config.API_URL + img}}
            shadow={4}
            borderRadius={'full'}
            w={70}
            h={70}
            ml={-6}
            resizeMode={'cover'}
            alt={'img'}
          />
          <Box ml={5}>
            <Text color={'secondary.400'} fontWeight={'700'} fontSize={'lg'}>
              {heading}
            </Text>
          </Box>
        </HStack>
        <IconButton
          icon={<Icon as={MaterialIcons} name="arrow-forward-ios" />}
          variant="solid"
          bg={'white'}
          size={'sm'}
          colorScheme={'white'}
          alignItems={'flex-end'}
          shadow={4}
          mr={-5}
          borderRadius="full"
          _icon={{
            size: 'md',
            color: 'secondary.400',
          }}
        />
      </HStack>
    </Pressable>
  );
};
