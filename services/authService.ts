import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch('endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Error en la autenticación');
    }

    const data = await response.json();
    // Acá recibo el token
    await AsyncStorage.setItem('token', data.token);

    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
};
