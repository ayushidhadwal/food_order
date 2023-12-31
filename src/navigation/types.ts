import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
} from '@react-navigation/native';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {AddressDTO} from '../services';
import {ChildCategory} from '../hooks/category';

export type AuthStackParamsList = {
  Welcome: undefined;
  GetStarted: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Verify: {email: string; otp: number};
  NewPassword: {email: string; otp: number};
};

export type BottomTabsParamList = {
  Menu: {} | undefined;
  Latest: {} | undefined;
  Home: {} | undefined;
  Order: {} | undefined;
  More: {} | undefined;
};

export type RootStackParamsList = {
  BottomTabs: BottomTabsParamList;
  PrivacyPolicy: undefined;
  Profile: undefined;
  OrderDetail: {id: number};
  Notification: undefined;
  About: undefined;
  Cart: undefined;
  SubCategories: {screenName: string; categoryId: number};
  ChildCategory: {screenName: string; childCategoryId: number};
  Customize: ChildCategory;
  Checkout: {
    totalPrice: number;
    addressId: number;
  };
  Address: undefined;
  NewAddress: undefined;
  EditAddress: AddressDTO;
  ChangePassword: undefined;
  PopularDishes: undefined;
  ChooseAddress: {totalPrice: number};
};

export type AuthNavigationProps =
  NativeStackNavigationProp<AuthStackParamsList>;

export type AuthStackScreenProps<Screen extends keyof AuthStackParamsList> =
  NativeStackScreenProps<AuthStackParamsList, Screen>;

export type RootNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamsList>,
  BottomTabNavigationProp<BottomTabsParamList>
>;
export type RootStackScreenProps<Screen extends keyof RootStackParamsList> =
  CompositeScreenProps<
    NativeStackScreenProps<RootStackParamsList, Screen>,
    BottomTabScreenProps<BottomTabsParamList>
  >;

export type RootBottomTabScreenProps<Screen extends keyof BottomTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabsParamList, Screen>,
    NativeStackScreenProps<RootStackParamsList>
  >;
