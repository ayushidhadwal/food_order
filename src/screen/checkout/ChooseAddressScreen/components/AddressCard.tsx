import React, {FC} from 'react';
import {HStack, IconButton, Pressable, Text} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  id: number;
  userHouse: string;
  userState: string;
  userCity: string;
  userApartment: string;
  userStreet: string;
  crossStreet: string;
  onPressHandler: () => void;
};

export const AddressCard: FC<Props> = ({
  userHouse,
  userApartment,
  userStreet,
  crossStreet,
  userCity,
  userState,
  onPressHandler,
}) => {
  return (
    <Pressable
      shadow={1}
      bg="#FFF"
      ml={4}
      mr={6}
      mb={4}
      borderRadius={5}
      p={2}
      onPress={onPressHandler}>
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <Text>
          <Text fontWeight={'500'}>Address : </Text>
          {userHouse +
            ', ' +
            userApartment +
            ',\n' +
            userStreet +
            ', ' +
            crossStreet +
            ',\n' +
            userCity +
            ', ' +
            userState}
        </Text>
        <IconButton
          _icon={{
            as: MaterialIcons,
            name: 'arrow-forward-ios',
            color: 'secondary.400',
          }}
          variant="solid"
          bg={'muted.200'}
          size={'sm'}
          shadow={4}
          mr={-5}
          borderRadius="full"
        />
      </HStack>
    </Pressable>
  );
};
