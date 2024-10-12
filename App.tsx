import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { RootNavigator } from './navigation/RootNavigator';

export function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}

export default App;
