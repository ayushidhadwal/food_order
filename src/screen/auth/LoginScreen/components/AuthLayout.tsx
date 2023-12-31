import React from 'react';
import {Image, Text} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type Props = {
  heading: string;
  subHeading: string;
  children: React.ReactNode;
};

export const AuthLayout = ({heading, subHeading, children}: Props) => {
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView
        edges={['top']}
        style={{paddingHorizontal: 32, paddingVertical: 15}}>
        <Image
          source={require('../../../../assets/logo.png')}
          w={190}
          h={120}
          my={25}
          resizeMode={'contain'}
          alignSelf={'center'}
          alt={'img'}
        />
        <Text fontWeight={'600'} fontSize={'3xl'}>
          {heading}
        </Text>
        <Text
          fontSize={'sm'}
          fontWeight={'500'}
          color={'gray.400'}
          mt={1}
          mb={8}>
          {subHeading}
        </Text>
        {children}
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
