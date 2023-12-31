import React, {FC} from 'react';
import {Box, HStack, Menu, Pressable, Text, VStack} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {
  id: number;
  userHouse: string;
  userState: string;
  userCity: string;
  userApartment: string;
  userStreet: string;
  crossStreet: string;
  deleteAddress: (addressId: number) => Promise<void>;
  editAddress: () => void;
};

export const AddressItem: FC<Props> = ({
  id,
  userHouse,
  userApartment,
  userStreet,
  crossStreet,
  userCity,
  userState,
  deleteAddress,
  editAddress,
}) => {
  return (
    <Box shadow={1} bg="#FFF" mx={4} mb={4} borderRadius={5}>
      <HStack flex={1} p={2} alignItems="flex-start">
        <HStack flexShrink={1} flex={2} alignItems="flex-start">
          <VStack ml={2}>
            <HStack mb={1} space={2}>
              <Text color="muted.400">House :</Text>
              <Text fontWeight="500">{userHouse}</Text>
            </HStack>

            <HStack mb={1} space={2}>
              <Text color="muted.400">Apartment :</Text>
              <Text fontWeight="500">{userApartment}</Text>
            </HStack>

            <HStack mb={1} space={2}>
              <Text color="muted.400">Street :</Text>
              <Text fontWeight="500">{userStreet}</Text>
            </HStack>

            <HStack mb={1} space={2}>
              <Text color="muted.400">Cross Street :</Text>
              <Text fontWeight="500">{crossStreet}</Text>
            </HStack>

            <HStack mb={1} space={2}>
              <Text color="muted.400">City :</Text>
              <Text fontWeight="500">{userCity}</Text>
            </HStack>

            <HStack mb={1} space={2}>
              <Text color="muted.400">State :</Text>
              <Text fontWeight="500">{userState}</Text>
            </HStack>
          </VStack>
        </HStack>

        <Box>
          <Menu
            backgroundColor={'secondary.400'}
            shouldOverlapWithTrigger={true}
            placement={'right top'}
            trigger={triggerProps => (
              <Pressable {...triggerProps} alignSelf={'flex-end'}>
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  size={24}
                  color="black"
                />
              </Pressable>
            )}>
            <Menu.Item onPress={editAddress}>
              <AntDesign name="edit" size={15} color="white" />
              <Text color={'white'}>Edit</Text>
            </Menu.Item>
            <Menu.Item onPress={() => deleteAddress(id)}>
              <AntDesign name="delete" size={15} color="white" />
              <Text color={'white'}>Delete</Text>
            </Menu.Item>
          </Menu>
        </Box>
      </HStack>
    </Box>
  );
};
