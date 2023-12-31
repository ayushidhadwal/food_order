import * as React from 'react';
import {Box, HStack} from 'native-base';

type Props = {
  data: any[];
  activeIndex: number;
};

export const SliderDots: React.FC<Props> = ({data, activeIndex}) => {
  return (
    <HStack h={8} w="20%" alignSelf={'center'} key={activeIndex}>
      {data.map((_, index) => {
        if (index === activeIndex) {
          return <Box bg="#002868" h={3} w={3} mx={1} rounded={10} key={index} />;
        }

        return <Box bg="light.300" h={3} w={3} mx={1} rounded={10} key={index} />;
      })}
    </HStack>
  );
};
