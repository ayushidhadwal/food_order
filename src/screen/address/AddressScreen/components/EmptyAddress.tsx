import React, {FC} from 'react';
import {Text, VStack} from 'native-base';
import {Empty} from './empty';

type Props = {
  onPress: () => void;
};

export const EmptyAddress: FC<Props> = ({onPress}) => {
  return (
    <Empty>
      <VStack alignItems="center">
        <Text fontSize="lg" bold color="warning.500">
          No Addresses
        </Text>
        <Text underline color="primary.400" onPress={onPress} bold>
          Add
        </Text>
      </VStack>
    </Empty>
  );
};
