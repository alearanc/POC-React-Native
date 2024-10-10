import {Inmueble} from './interfaces/Inmueble.interface';

export async function getInmuebles() {
  try {
    const INMUEBLES = 'http://10.0.2.2:3000/inmueble/get/';

    const rawData = await fetch(INMUEBLES);
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
    const INMUEBLES_URL = 'http://10.0.2.2:3000/inmueble/add/';
    const response = await fetch(INMUEBLES_URL, {
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