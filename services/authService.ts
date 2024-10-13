import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOGIN_URL = 'http://10.0.2.2:3000/persona/signin/'

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(LOGIN_URL, { email, password });
    const { token, user } = response.data;
    const tokenString = JSON.stringify(token);
    
    await AsyncStorage.setItem('authtoken', tokenString);

    return { token, user };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        throw new Error('Credenciales inválidas');
      } else {
        console.log(error);
        throw new Error('Ocurrió un error inesperado');
      }
    }
};

export const logout = async () => {
  await AsyncStorage.removeItem('authtoken');
};
