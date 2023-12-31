import React, {FC, useContext} from 'react';
import {ScrollView} from 'native-base';

import {MoreCard} from './components/MoreCard';
import {RootBottomTabScreenProps} from '../../../navigation/types';
import {AuthContext} from '../../../contexts/auth';

type Props = RootBottomTabScreenProps<'More'>;

export const MoreScreen: FC<Props> = ({navigation}: Props) => {
  const {logout} = useContext(AuthContext);
  return (
    <ScrollView mb={12} flex={1} backgroundColor={'white'}>
      <MoreCard
        name={'Profile'}
        onPress={() => navigation.navigate('Profile')}
        iconName={'person'}
        style={{marginTop: 20}}
      />
      <MoreCard
        name={'Address'}
        iconName={'location-pin'}
        onPress={() => navigation.navigate('Address')}
      />
      <MoreCard
        name={'Change Password'}
        iconName={'lock'}
        onPress={() => navigation.navigate('ChangePassword')}
      />
      <MoreCard
        name={'Notifications'}
        iconName={'notifications'}
        onPress={() => navigation.navigate('Notification')}
      />
      <MoreCard
        name={'Privacy Policy'}
        iconName={'privacy-tip'}
        onPress={() => {}}
      />
      <MoreCard name={'About Us'} iconName={'info'} onPress={() => {}} />
      <MoreCard name={'Logout'} iconName={'logout'} onPress={logout} />
    </ScrollView>
  );
};
