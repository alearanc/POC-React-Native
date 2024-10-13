import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Alert, Button, SafeAreaView,StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from 'react';
import {LoginErrors} from '../interfaces/LoginErrors.interface';
import { login } from '../services/authService';
import {RootStackParamList} from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({navigation}: Props): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let errors: LoginErrors = {};
    if (!email) errors.email = 'El correo es obligatorio';
    if (!password) errors.password = 'La contraseña es obligatoria';

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      await login(email, password);

      setEmail('');
      setPassword('');
      setErrors({});
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Iniciar sesión</Text>
          <TextInput
            placeholder="Correo"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}
          <TextInput
            placeholder="Contraseña"
            style={styles.input}
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
          <Text style={styles.link}>Olvidé mi contraseña</Text>
          <Button
            title={loading ? 'Cargando...' : 'Iniciar sesión'}
            onPress={handleSubmit}
            disabled={loading}
          />
          <Text style={styles.toRegister}>¿No tenés cuenta? Registrate</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea : {
    flex: 1,
  },
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
  },
  form: {
    marginVertical: 36,
  },
  input: {
    borderColor: '#d4d4d4',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingLeft: 16,
    marginBottom: 36,
  },
  link: {
    marginTop: 18,
    marginBottom: 10,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#1e1e1e',
    marginBottom: 36,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1e1e1e',
    marginBottom: 36,
    textAlign: 'left',
  },
  toRegister: {
    marginTop: 16,
  },
});
