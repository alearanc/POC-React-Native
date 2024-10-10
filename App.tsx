import React from 'react';
import { StyleSheet, View} from 'react-native';
import {Main} from './components/Main';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export function App(): React.JSX.Element {
  // Providers
  return (
    <SafeAreaProvider>
        <View style={styles.scrollContent}>
          <Main />
        </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  scrollContent: {
    flexGrow: 1,
  }
});

export default App;
