import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Box, Icon, IconButton, Pressable, Text} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useUserProfile} from '../hooks/user';
import {MenuScreen} from '../screen/menu/MenuScreen';
import {LatestScreen} from '../screen/latest';
import {HomeScreen} from '../screen/home';
import {OrderScreen} from '../screen/order/OrderScreen';
import {MoreScreen} from '../screen/more/MoreScreen';

const BottomTabsNavigation = () => {
  const {isLoading, profile} = useUserProfile();

  const _renderIcon = (routeName: string, selectedTab: string) => {
    let icon = '';
    let type = null;

    switch (routeName) {
      case 'Menu':
        type = FontAwesome5;
        icon = 'microsoft';
        break;
      case 'Latest':
        type = MaterialCommunityIcons;
        icon = 'new-box';
        break;
      case 'Order':
        type = FontAwesome5;
        icon = 'shopping-bag';
        break;
      case 'More':
        type = FontAwesome5;
        icon = 'list';
        break;
    }
    return (
      <Box alignItems={'center'}>
        <Icon
          as={type}
          name={icon}
          size={'sm'}
          color={routeName === selectedTab ? 'primary.600' : 'gray.400'}
        />
        <Text
          fontSize={'sm'}
          color={routeName === selectedTab ? 'primary.600' : 'gray.400'}>
          {routeName}
        </Text>
      </Box>
    );
  };

  const renderTabBar = ({routeName, selectedTab, navigate}: any) => {
    return (
      <Pressable
        onPress={() => navigate(routeName)}
        flex={1}
        alignItems={'center'}
        justifyContent={'center'}>
        {_renderIcon(routeName, selectedTab)}
      </Pressable>
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1, backgroundColor: '#fff'}}>
      <CurvedBottomBar.Navigator
        strokeWidth={0.5}
        strokeColor="#DDDDDD"
        height={65}
        circleWidth={55}
        bgColor="white"
        initialRouteName="Home"
        borderTopLeftRight
        renderCircle={({selectedTab, navigate}) => (
          <Animated.View
            style={[
              styles.btnCircle,
              {backgroundColor: selectedTab === 'Home' ? '#bf0a30' : 'white'},
            ]}>
            <Pressable
              flex={1}
              justifyContent="center"
              onPress={() => navigate('Home')}>
              <Icon
                as={Ionicons}
                name={'home-sharp'}
                size={'lg'}
                color={selectedTab === 'Home' ? 'white' : 'gray.400'}
              />
            </Pressable>
          </Animated.View>
        )}
        tabBar={renderTabBar}>
        <CurvedBottomBar.Screen
          name="Menu"
          position="LEFT"
          options={({navigation}: any) => ({
            title: null,
            headerRight: () => (
              <IconButton
                onPress={() => navigation.navigate('Cart')}
                colorScheme="muted"
                variant={'ghost'}
                mr={2}
                _icon={{
                  as: Ionicons,
                  name: 'cart',
                  size: 'lg',
                }}
              />
            ),
            headerLeft: () => (
              <Text
                textAlign={'left'}
                fontSize={'lg'}
                fontWeight={'700'}
                ml={5}>
                Menu
              </Text>
            ),
          })}
          component={MenuScreen}
        />
        <CurvedBottomBar.Screen
          name="Latest"
          position="LEFT"
          options={({navigation}: any) => ({
            title: null,
            headerRight: () => (
              <IconButton
                onPress={() => navigation.navigate('Cart')}
                colorScheme="muted"
                variant={'ghost'}
                mr={2}
                _icon={{
                  as: Ionicons,
                  name: 'cart',
                  size: 'lg',
                }}
              />
            ),
            headerLeft: () => (
              <Text
                textAlign={'left'}
                fontSize={'lg'}
                fontWeight={'700'}
                ml={5}>
                Latest
              </Text>
            ),
          })}
          component={LatestScreen}
        />
        <CurvedBottomBar.Screen
          name="Home"
          position="CENTER"
          options={({navigation}: any) => ({
            title: null,
            headerRight: () => (
              <IconButton
                onPress={() => navigation.navigate('Cart')}
                colorScheme="muted"
                variant={'ghost'}
                mr={2}
                _icon={{
                  as: Ionicons,
                  name: 'cart',
                  size: 'lg',
                }}
              />
            ),
            headerLeft: () => (
              <Box>
                <Text
                  textAlign={'left'}
                  fontSize={'lg'}
                  fontWeight={'700'}
                  ml={5}>
                  Welcome
                </Text>
                <Text
                  textAlign={'left'}
                  fontSize={'sm'}
                  fontWeight={'700'}
                  textTransform={'capitalize'}
                  numberOfLines={1}
                  mb={1}
                  ml={5}>
                  {isLoading ? 'Please wait ...' : profile?.name}
                </Text>
              </Box>
            ),
          })}
          component={HomeScreen}
        />
        <CurvedBottomBar.Screen
          name="Order"
          component={OrderScreen}
          options={({navigation}: any) => ({
            title: null,
            headerRight: () => (
              <IconButton
                onPress={() => navigation.navigate('Cart')}
                colorScheme="muted"
                variant={'ghost'}
                mr={2}
                _icon={{
                  as: Ionicons,
                  name: 'cart',
                  size: 'lg',
                }}
              />
            ),
            headerLeft: () => (
              <Text
                textAlign={'left'}
                fontSize={'lg'}
                fontWeight={'700'}
                ml={5}>
                Order
              </Text>
            ),
          })}
          position="RIGHT"
        />
        <CurvedBottomBar.Screen
          name="More"
          component={MoreScreen}
          options={({navigation}: any) => ({
            title: null,
            headerRight: () => (
              <IconButton
                onPress={() => navigation.navigate('Cart')}
                colorScheme="muted"
                variant={'ghost'}
                mr={2}
                _icon={{
                  as: Ionicons,
                  name: 'cart',
                  size: 'lg',
                }}
              />
            ),
            headerLeft: () => (
              <Text
                textAlign={'left'}
                fontSize={'lg'}
                fontWeight={'700'}
                ml={5}>
                More
              </Text>
            ),
          })}
          position="RIGHT"
        />
      </CurvedBottomBar.Navigator>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    bottom: 30,
  },
});
export default BottomTabsNavigation;
