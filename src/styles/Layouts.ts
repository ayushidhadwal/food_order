import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const Layouts = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};

export const percentage = (total: number, percent: number): number =>
  (total * percent) / 100;

export const widthPercent = (percent: number): number =>
  percentage(width, percent);

export const heightPercent = (percent: number): number =>
  percentage(height, percent);
