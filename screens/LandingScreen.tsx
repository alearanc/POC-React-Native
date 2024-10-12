import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export function LandingScreen({navigation}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Comenzar" onPress={() => navigation.navigate('Login')} />
        <Text style={styles.toLogin}>¿No tenés cuenta? Registrate</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  header: {},
  heroImage: {
    height: 100,
    width: 100,
  },
  subtitle: {},
  title: {},
  toLogin: {},
});
