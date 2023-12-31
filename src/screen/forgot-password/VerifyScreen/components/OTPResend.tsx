import {Text} from 'native-base';
import React, {FC, memo, useState} from 'react';

import {useInterval} from '../../../../hooks/useInterval';

type Props = {
  onOTPResend: () => void;
};

const OTPResend: FC<Props> = ({onOTPResend}) => {
  const [timer, setTimer] = useState<number>(120);

  useInterval(() => {
    setTimer(prevState => {
      if (prevState === 0) {
        return 0;
      } else {
        return prevState - 1;
      }
    });
  }, 1000);

  return (
    <>
      {timer === 0 ? (
        <Text textAlign={'center'} mt={8} mb={5} fontWeight={'500'}>
          Didn't received?{' '}
          <Text
            color={'secondary.400'}
            fontWeight={'700'}
            onPress={async () => {
              await onOTPResend();
              setTimer(120);
            }}>
            Click here
          </Text>
        </Text>
      ) : (
        <Text mb={2} mt={2} color="grey" textAlign="center">
          Resend in{' '}
          <Text fontWeight="500" color="primary.400">
            {timer} sec
          </Text>
        </Text>
      )}
    </>
  );
};

export default memo(OTPResend);
