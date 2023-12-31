import {extendTheme} from 'native-base';

export const NativeBaseTheme = extendTheme({
  fontConfig: {
    Poppins: {
      100: {
        normal: 'Poppins-Thin',
        italic: 'Poppins-ThinItalic',
      },
      200: {
        normal: 'Poppins-Light',
        italic: 'Poppins-LightItalic',
      },
      300: {
        normal: 'Poppins-ExtraLight',
        italic: 'Poppins-ExtraLightItalic',
      },
      400: {
        normal: 'Poppins-Regular',
        italic: 'Poppins-Italic',
      },
      500: {
        normal: 'Poppins-Medium',
        italic: 'Poppins-MediumItalic',
      },
      600: {
        normal: 'Poppins-Bold',
        italic: 'Poppins-BoldItalic',
      },
      700: {
        normal: 'Poppins-SemiBold',
        italic: 'Poppins-SemiBoldItalic',
      },
      800: {
        normal: 'Poppins-ExtraBold',
        italic: 'Poppins-ExtraBoldItalic',
      },
      900: {
        normal: 'Poppins-Black',
        italic: 'Poppins-BlackItalic',
      },
    },
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
    mono: 'Poppins',
  },
  colors: {
    primary: {
      '50': '#ff6788',
      '100': '#ff3f69',
      '200': '#fa1c4c',
      '300': '#e30c3a',
      '400': '#87112a',
      '500': '#a10e2e',
      '600': '#bf0a30', // actual color
      '700': '#6e1226',
      '800': '#571221',
      '900': '#41101b',
    },
    secondary: {
      '50': '#0666ff',
      '100': '#0055dd',
      '200': '#0046b6',
      '300': '#00368e',
      '400': '#002868', // actual color
      '500': '#021f4c',
      '600': '#031634',
      '700': '#030d1d',
      '800': '#010307',
      '900': '#000000',
    },
  },
});
