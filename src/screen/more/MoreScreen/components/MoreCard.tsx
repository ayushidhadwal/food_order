import React, {FC} from 'react';
import {Box, HStack, IconButton, Pressable, Text} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ViewStyle} from 'react-native';

type Props = {
  name: string;
  iconName: string;
  onPress: () => void;
  style?: ViewStyle;
};

export const MoreCard: FC<Props> = ({
  name,
  onPress,
  iconName,
  style,
}: Props) => {
  return (
    <Pressable
      borderRadius={8}
      w={'85%'}
      p={2}
      alignSelf={'center'}
      mb={4}
      onPress={onPress}
      shadow={2}
      style={{...style}}
      bgColor={'white'}>
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <HStack alignItems={'center'}>
          <Box
            p={3}
            alignItems={'center'}
            borderRadius={'full'}
            bgColor={'gray.100'}>
            <MaterialIcons name={iconName} size={24} color="black" />
          </Box>
          <Text ml={3} color={'gray.400'}>
            {name}
          </Text>
        </HStack>
        <IconButton
          bg={'gray.300'}
          variant={'solid'}
          colorScheme={'muted'}
          _icon={{
            as: MaterialIcons,
            name: 'keyboard-arrow-right',
            color: 'black',
          }}
          mr={-5}
          p={1}
          h={8}
          w={8}
          borderRadius={'full'}
        />
      </HStack>
    </Pressable>
  );
};
