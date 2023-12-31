import React, {useCallback, useEffect, useState} from 'react';
import NetInfo, {
  NetInfoState,
  useNetInfo,
} from '@react-native-community/netinfo';
import {Button, VStack, Modal, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import Config from '../config';
import {Layouts} from '../styles';

const WIDTH = (Layouts.window.width * 90) / 100;
const HEIGHT = (Layouts.window.height * 20) / 100;

const IMAGE = require('../assets/auth/network-warning.png');

export const NetInfoCheck = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const netInfo = useNetInfo();

  const setInternetStatus = useCallback((info: NetInfoState) => {
    const isConnected = info.isInternetReachable && info.isConnected;

    if (typeof isConnected === 'boolean') {
      setModalVisible(!isConnected);
    }
  }, []);

  useEffect(() => {
    setInternetStatus(netInfo);
  }, [netInfo, setInternetStatus]);

  const refresh = () => NetInfo.refresh().then(setInternetStatus);

  return (
    <Modal size="full" isOpen={modalVisible} safeAreaBottom>
      <Modal.Content style={styles.modelContent} rounded={0} bg="#FFF">
        <Modal.Header>
          <Text fontSize="xl" textAlign="center" fontWeight="bold">
            Network Offline!
          </Text>
        </Modal.Header>
        <Modal.Body>
          <VStack space={2} mb={10} alignItems="center">
            <FastImage
              style={{width: WIDTH, height: HEIGHT}}
              source={IMAGE}
              resizeMode={FastImage.resizeMode.contain}
            />

            <Text textAlign="center" fontSize="md">
              It seems there is something wrong with your internet connection.
              Please connect to the internet and start {Config.APP_NAME} again.
            </Text>
          </VStack>

          <Button onPress={refresh} colorScheme="lime">
            Try Again!
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modelContent: {
    marginBottom: 0,
    marginTop: 'auto',
  },
});
