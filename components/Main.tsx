import React, {useState, useEffect} from 'react';
import {ActivityIndicator, FlatList, ScrollView, View} from 'react-native';
import {getInmuebles} from '../inmuebles';
import {Inmueble} from '../interfaces/Inmueble.interface';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {InmuebleCard} from './InmuebleCard';
import { CreateInmuebleForm } from './CreateInmuebleForm';

export function Main(): React.JSX.Element {
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getInmuebles()
      .then(inmuebles => {
        if (inmuebles && inmuebles.length > 0) {
          setInmuebles(inmuebles);
        } else {
          console.warn('No se encontraron inmuebles');
        }
      })
      .catch(error => {
        console.error('Error en el uso del hook useEffect: ', error);
      });
  }, []);

  return (
    // Utiliza padding de insets para área segura para mostrar contenido
    // Funciona tanto para Android como para iOS
    <View style={{paddingTop: insets.top, paddingBottom: insets.bottom}}>
      <CreateInmuebleForm />
      {inmuebles.length === 0 ? (
        <ActivityIndicator color={'000'} size={'large'} />
      ) : (
        // Solo renderiza cuando está en el viewport
        <FlatList
          data={inmuebles}
          keyExtractor={inmueble => inmueble.id_inmueble.toString()}
          renderItem={({item}) => <InmuebleCard inmueble={item} />}
        />
      )}
    </View>
  );
}
