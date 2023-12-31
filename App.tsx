import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NativeBaseProvider, StatusBar} from 'native-base';
import Toast from 'react-native-toast-message';

import {NativeBaseTheme} from './src/styles';
import AppNavigation from './src/navigation';
import {AuthContextProvider} from './src/contexts/auth';
import {SwrProvider} from './src/lib/SwrProvider';
import {NetInfoCheck} from './src/lib/NetInfoCheck';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <AuthContextProvider>
        <SwrProvider>
          <NativeBaseProvider theme={NativeBaseTheme}>
            <NetInfoCheck />
            <AppNavigation />
            <Toast />
          </NativeBaseProvider>
        </SwrProvider>
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}

export default App;
