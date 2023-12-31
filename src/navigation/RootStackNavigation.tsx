import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text} from 'native-base';

import BottomTabsNavigation from './BottomTabsNavigation';
import {CartScreen} from '../screen/cart/CartScreen';
import {ProfileScreen} from '../screen/profile/ProfileScreen';
import {SubCategoriesScreen} from '../screen/menu/SubCategoryScreen';
import {ChildCategoryScreen} from '../screen/menu/ChildCategoryScreen';
import {AddressScreen} from '../screen/address/AddressScreen';
import {NewAddressScreen} from '../screen/address/NewAddressScreen';
import {EditAddressScreen} from '../screen/address/EditAddressScreen';
import {ChangePasswordScreen} from '../screen/change-password/ChangePasswordScreen';
import {CustomizeScreen} from '../screen/menu/CustomizeScreen';
import {PopularDishesScreen} from '../screen/popular-dishes';
import {ChooseAddressScreen} from '../screen/checkout/ChooseAddressScreen';
import {CheckoutScreen} from '../screen/checkout/CheckoutScreen';
import {OrderDetailScreen} from '../screen/order/OrderDetailsScreen';
import {NotificationScreen} from '../screen/notification/NotificationScreen';
import {RootStackParamsList} from './types';

const Stack = createNativeStackNavigator<RootStackParamsList>();

function RootStackNavigation() {
  return (
    <Stack.Navigator initialRouteName={'BottomTabs'}>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabsNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: () => (
            <Text fontWeight={'500'} fontSize={'lg'}>
              Profile
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Address"
        component={AddressScreen}
        options={{
          headerTitle: () => (
            <Text fontWeight={'500'} fontSize={'lg'}>
              Address
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="NewAddress"
        component={NewAddressScreen}
        options={{
          headerTitle: () => (
            <Text fontWeight={'500'} fontSize={'lg'}>
              New Address
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="EditAddress"
        component={EditAddressScreen}
        options={{
          headerTitle: () => (
            <Text fontWeight={'500'} fontSize={'lg'}>
              Edit Address
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{
          headerTitle: () => (
            <Text fontWeight={'500'} fontSize={'lg'}>
              My Order Details
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerTitle: () => (
            <Text fontWeight={'500'} fontSize={'lg'}>
              Notifications
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerTitle: () => (
            <Text fontWeight={'500'} fontSize={'lg'}>
              Cart
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="SubCategories"
        component={SubCategoriesScreen}
        options={({route}) => ({
          headerTitle: () => (
            <Text fontWeight={'500'} fontSize={'lg'}>
              {route.params?.screenName}
            </Text>
          ),
        })}
      />
      <Stack.Screen
        name="ChildCategory"
        component={ChildCategoryScreen}
        options={({route}) => ({
          headerTitle: () => (
            <Text fontWeight={'500'} fontSize={'lg'}>
              {route.params?.screenName}
            </Text>
          ),
        })}
      />
      <Stack.Screen
        name="Customize"
        component={CustomizeScreen}
        options={{
          headerTitle: () => (
            <Text fontWeight={'500'} fontSize={'lg'}>
              Customizable
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          headerTitle: () => (
            <Text fontWeight={'500'} fontSize={'lg'}>
              Checkout
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          headerTitle: () => (
            <Text fontWeight={'500'} fontSize={'lg'}>
              Change Password
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="PopularDishes"
        component={PopularDishesScreen}
        options={{
          headerTitle: () => (
            <Text fontWeight={'500'} fontSize={'lg'}>
              Popular Dishes
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="ChooseAddress"
        component={ChooseAddressScreen}
        options={{
          headerTitle: () => (
            <Text fontWeight={'500'} fontSize={'lg'}>
              Choose Address
            </Text>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default RootStackNavigation;
