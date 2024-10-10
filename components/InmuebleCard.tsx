import {StyleSheet, Text, View} from 'react-native';
import {InmuebleCardProps} from '../interfaces/InmuebleCardProps.interface';

export function InmuebleCard({inmueble}: InmuebleCardProps) {
  return (
    <View key={inmueble.id_inmueble} style={styles.card}>
      <Text style={styles.title}>Titulo: {inmueble.titulo_inmueble}</Text>
      <Text style={styles.text}>
        Descripción: {inmueble.descripcion_inmueble}
      </Text>
      <Text style={styles.text}>Precio por noche: {inmueble.precio_noche}</Text>
      <Text style={styles.text}>Domicilio: {inmueble.direccion_inmueble}</Text>
      <Text style={styles.text}>
        Capacidad (personas): {inmueble.capacidad}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '000',
  },
});
