import React, {FC} from 'react';
import {Dimensions, ImageBackground} from 'react-native';
import {Box, ScrollView} from 'native-base';

import {MenuCard} from './components/MenuCard';
import {Category, useCategoryList} from '../../../hooks/category';
import {RootBottomTabScreenProps} from '../../../navigation/types';
import {Loader} from '../../../components/common/Loader';

type Props = RootBottomTabScreenProps<'Menu'>;

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

export const MenuScreen: FC<Props> = ({navigation}: Props) => {
  const {isLoading, category} = useCategoryList();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView>
      <Box
        h={HEIGHT - 190}
        bg={'white'}
        justifyContent={'center'}
        alignItems={'center'}>
        <ImageBackground
          source={require('../../../assets/bgImgs/sideBar.png')}
          resizeMode={'cover'}
          style={{
            width: WIDTH,
            height: HEIGHT / 1.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {category?.map((item: Category) => (
            <MenuCard
              key={item.id as number}
              heading={item.categoryName as string}
              img={item.categoryImage as string}
              onPress={() =>
                navigation.navigate('SubCategories', {
                  screenName: item.categoryName,
                  categoryId: item.id,
                })
              }
            />
          ))}
        </ImageBackground>
      </Box>
    </ScrollView>
  );
};
