import React, {FC, useCallback, useRef} from 'react';
import {Box, Button, HStack, Image, Text} from 'native-base';
import {Dimensions, FlatList, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {GetStarted, GetStartedItem} from './components/GetStarted';
import {SliderDots} from './components/SliderDots';
import {AuthStackScreenProps} from '../../../navigation/types';

type Props = AuthStackScreenProps<'GetStarted'>;

const window = Dimensions.get('window');

export const GetStartedScreen: FC<Props> = ({navigation}: Props) => {
  const [index, setIndex] = React.useState<number>(0);

  const onViewableItemsChanged = useCallback(
    (data: {changed: {index: number}[]}) => {
      setIndex(data.changed[0].index as number);
    },
    [],
  );

  const flatListRef = useRef<FlatList>(null);
  const onSkip = () => navigation.navigate('Welcome');
  const onNext = () => {
    flatListRef.current?.scrollToIndex({index: index + 1, animated: true});
  };

  const renderItem = ({item}: {item: GetStartedItem}) => {
    return (
      <Box flex={1} w={window.width}>
        <Text
          bold
          fontFamily="body"
          fontWeight={'300'}
          fontStyle="normal"
          color="black"
          fontSize="xl"
          mt={10}
          ml={5}>
          {item.heading}
        </Text>
        <Text
          fontFamily="body"
          fontWeight={'300'}
          fontStyle="normal"
          fontSize="md"
          ml={5}
          color="grey">
          {item.text}
        </Text>
        <Image
          mt={16}
          alignSelf={'center'}
          source={item.image}
          resizeMode={'contain'}
          h={window.height / 2}
          alt="slider img"
        />
      </Box>
    );
  };

  // @ts-ignore
  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle={'dark-content'}
      />

      <FlatList
        data={GetStarted}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: '50%',
        }}
        ref={flatListRef}
      />
      <SliderDots data={GetStarted} activeIndex={index} />
      <HStack justifyContent="space-between" p={5}>
        <Button
          colorScheme={'secondary'}
          size={'lg'}
          variant={'ghost'}
          rounded={10}
          px={5}
          fontWeight={'500'}
          py={2}
          isDisabled={index === GetStarted.length - 1}
          onPress={onSkip}>
          Skip
        </Button>
        <Button
          shadow={5}
          rounded={10}
          px={5}
          py={2}
          colorScheme={'primary'}
          onPress={index === GetStarted.length - 1 ? onSkip : onNext}>
          {index === GetStarted.length - 1 ? 'Start' : 'Next'}
        </Button>
      </HStack>
    </SafeAreaView>
  );
};
