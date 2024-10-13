import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Alert, Button, SafeAreaView,StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from 'react';
import {LoginErrors} from '../interfaces/LoginErrors.interface';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      const response = await axios.post(
        'http://10.0.2.2:3000/persona/signin/',
        {email, password},
      );
      const {token, user} = response.data;
      const tokenString = JSON.stringify(token);
      await AsyncStorage.setItem('authtoken', tokenString);

      setEmail('');
      setPassword('');
      setErrors({});
      navigation.replace('Main');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          Alert.alert('Error', 'Credenciales inválidas. Inténtelo de nuevo.');
        } else {
          Alert.alert(
            'Error',
            'Ha ocurrido un error. Intente nuevamente más tarde.',
          );
        }
      } else {
        Alert.alert('Error', 'Ocurrió un error inesperado');
      }
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
