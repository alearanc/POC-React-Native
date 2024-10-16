import {Inmueble} from '../interfaces/Inmueble.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

const URL = 'http://10.0.2.2:3000/inmueble';

export async function getInmuebles() {
  try {
    const GET_URL = `${URL}/get`;

    const rawData = await fetch(GET_URL);
    const inmuebles: Inmueble[] = await rawData.json();

    if (!Array.isArray(inmuebles)) {
      throw new Error('La respuesta no es un arreglo');
    }

    return inmuebles.map(item => {
      const {
        id_inmueble,
        titulo_inmueble,
        descripcion_inmueble,
        precio_noche,
        direccion_inmueble,
        capacidad,
        id_tipoInmueble,
        cod_postal,
        id_propietario,
      } = item;

      return {
        id_inmueble,
        titulo_inmueble,
        descripcion_inmueble,
        precio_noche,
        direccion_inmueble,
        capacidad,
        id_tipoInmueble,
        cod_postal,
        id_propietario,
      };
    });
  } catch (error) {
    console.error('Error obteniendo los inmuebles:', error);
    return [];
  }
}

export async function createInmueble(inmueble: any) {
  try {
    const ADD_URL = `${URL}/add`;
    const response = await fetch(ADD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inmueble),
    });
    return response;
  } catch (error) {
    console.error('Error creando el inmueble: ', error);
    throw error;
  }
}

export async function deleteInmueble(id: number) {
  try {
    const DELETE_URL = `${URL}/delete/${id}`;

    const tokenData = await AsyncStorage.getItem('authtoken');
    const parsedTokenData = tokenData ? JSON.parse(tokenData) : null;
    
    if (!parsedTokenData || !parsedTokenData.token) throw new Error('Token de autenticación no encontrado');

    const token = parsedTokenData.token;

    const response = await fetch(DELETE_URL, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error('Error eliminando el inmueble: ', error);
    throw error;
  } finally {
    getInmuebles();
  }
}