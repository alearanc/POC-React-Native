import {
  Alert,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {InmuebleCardProps} from '../interfaces/InmuebleCardProps.interface';
import {deleteInmueble} from '../services/inmuebleService';

export function InmuebleCard({
  inmueble,
  reloadInmuebles,
}: InmuebleCardProps & {reloadInmuebles: () => void}) {
  const cardImg = require('../assets/image.svg');

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
      <View style={styles.imageContainer}>
        <Image source={cardImg} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{inmueble.titulo_inmueble}</Text>
        <Text style={styles.location}>{inmueble.direccion_inmueble}</Text>
      </View>
      <View style={styles.ratingPriceContainer}>
        <View style={styles.ratingContainer}>
          <Text>Puntuación</Text>
        </View>
        <Text style={styles.price}>${inmueble.precio_noche}/noche</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
      </View>
      <Button title="Eliminar" color="red" onPress={handleDelete} />
    </View>
  );
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    width: width - 40,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    alignSelf: 'center',
  },
  imageContainer: {
    backgroundColor: '#e0e0e0',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    paddingVertical: 8,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  ratingPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonText: {
    marginLeft: 8,
  },
});
