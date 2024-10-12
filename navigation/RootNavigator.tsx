import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen } from '../screens/LoginScreen';
import { LandingScreen } from '../screens/LandingScreen';
import { MainScreen } from '../screens/MainScreen';
import { enableScreens } from 'react-native-screens';

enableScreens();
const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Main: undefined
};

export function RootNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
