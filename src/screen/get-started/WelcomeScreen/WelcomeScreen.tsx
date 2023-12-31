import React, {FC} from 'react';
import {Box, Button, Image, Text, VStack} from 'native-base';
import {Dimensions} from 'react-native';

import {AuthStackScreenProps} from '../../../navigation/types';

type Props = AuthStackScreenProps<'Welcome'>;

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

export const WelcomeScreen: FC<Props> = ({navigation}: Props) => {
  return (
    <Box flex={1}>
      <Image
        source={require('../../../assets/auth/background.png')}
        w={WIDTH}
        h={HEIGHT / 2}
        resizeMode={'cover'}
        alt={'img'}
      />
      <Image
        source={require('../../../assets/logo.png')}
        w={160}
        h={100}
        resizeMode={'contain'}
        alt={'img'}
        alignSelf={'center'}
        mt={-20}
      />
      <VStack flex={1 / 2} alignItems={'center'} p={10}>
        <Text textAlign={'center'} my={12}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit Alias aperiam
          aut.
        </Text>
        <Button
          variant={'solid'}
          w={'100%'}
          size={'lg'}
          onPress={() => navigation.navigate('Login')}
          colorScheme={'primary'}>
          Login
        </Button>
        <Button
          variant={'outline'}
          w={'100%'}
          size={'lg'}
          mt={4}
          borderColor={'primary.600'}
          onPress={() => navigation.navigate('Register')}
          colorScheme={'primary'}>
          Create an Account
        </Button>
      </VStack>
    </Box>
  );
};
