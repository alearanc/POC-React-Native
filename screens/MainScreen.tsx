import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Modal,
  StyleSheet,
  View,
} from 'react-native';
import {getInmuebles} from '../services/inmuebleService';
import {Inmueble} from '../interfaces/Inmueble.interface';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {InmuebleCard} from '../components/InmuebleCard';
import { CreateInmuebleForm } from '../components/forms/CreateInmuebleForm';
import { RootStackParamList } from '../navigation/RootNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export function MainScreen(): React.JSX.Element {
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadInmuebles();
  }, []);

  const loadInmuebles = async () => {
    try {
      const inmuebles = await getInmuebles();
      setInmuebles(inmuebles);
    } catch (error) {
      console.error('Error cargando los inmuebles: ', error);
    }
  };

  return (
    <View style={{paddingTop: insets.top, paddingBottom: insets.bottom}}>
      <Button title="Agregar inmueble" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CreateInmuebleForm />
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {inmuebles.length === 0 ? (
        <ActivityIndicator color={'000'} size={'large'} />
      ) : (
        // Solo renderiza cuando está en el viewport
        <FlatList
          data={inmuebles}
          keyExtractor={inmueble => inmueble.id_inmueble.toString()}
          renderItem={({item}) => (
            <InmuebleCard inmueble={item} reloadInmuebles={loadInmuebles} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
