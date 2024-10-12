import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {InmuebleCardProps} from '../interfaces/InmuebleCardProps.interface';
import {deleteInmueble} from '../services/inmuebleService';

export function InmuebleCard({
  inmueble,
  reloadInmuebles,
}: InmuebleCardProps & {reloadInmuebles: () => void}) {
  const handleDelete = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que querés eliminar este inmueble?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await deleteInmueble(inmueble.id_inmueble);
              if (response.ok) {
                Alert.alert('Éxito', 'Inmueble eliminado correctamente');
                reloadInmuebles();
              } else {
                console.log(response);
                Alert.alert('Error', 'No se pudo eliminar el inmueble');
              }
            } catch (error) {
              console.log('Error: ', error);
              Alert.alert('Error', `Ocurrió un error al eliminar el inmueble`);
            }
          },
        },
      ],
    );
  };

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
      <Button title="Eliminar" color="red" onPress={handleDelete} />
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
