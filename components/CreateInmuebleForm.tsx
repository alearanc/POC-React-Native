import React, {useState} from 'react';
import {
  Button,
  TextInput,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {createInmueble} from '../inmuebles';

export function CreateInmuebleForm() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioNoche, setPrecioNoche] = useState('');
  const [direccion, setDireccion] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [codPostal, setCodPostal] = useState('');
  const [tipoInmueble, setTipoInmueble] = useState('');
  const [idPropietario, setIdPropietario] = useState('');

  const handleSubmit = async () => {
    if (
      !titulo ||
      !descripcion ||
      !precioNoche ||
      !direccion ||
      !capacidad ||
      !codPostal ||
      !tipoInmueble ||
      !idPropietario
    ) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const inmueble = {
      titulo_inmueble: titulo,
      descripcion_inmueble: descripcion,
      precio_noche: parseFloat(precioNoche),
      direccion_inmueble: direccion,
      capacidad: parseInt(capacidad),
      tipo_inmueble: {id_tipoinmueble: parseInt(tipoInmueble)},
      localidad: {cod_postal: parseInt(codPostal)},
      propietario: parseInt(idPropietario),
    };

    try {
      const response = await createInmueble(inmueble);
      if (response.ok) {
        Alert.alert('Exito', 'Inmueble cargado correctamente');
        setTitulo('');
        setDescripcion('');
        setPrecioNoche('');
        setDireccion('');
        setCapacidad('');
        setCodPostal('');
        setTipoInmueble('');
        setIdPropietario('');
      } else {
        Alert.alert('Error', 'No se pudo crear el inmueble');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al crear el inmueble');
    }
  };

  return (
    <ScrollView style={styles.form}>
      <TextInput
        placeholder="Título del inmueble"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />
      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        style={styles.input}
      />
      <TextInput
        placeholder="Precio por noche"
        value={precioNoche}
        onChangeText={setPrecioNoche}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
        style={styles.input}
      />
      <TextInput
        placeholder="Capacidad"
        value={capacidad}
        onChangeText={setCapacidad}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Código Postal"
        value={codPostal}
        onChangeText={setCodPostal}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="ID Tipo Inmueble"
        value={tipoInmueble}
        onChangeText={setTipoInmueble}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="ID Propietario"
        value={idPropietario}
        onChangeText={setIdPropietario}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Crear Inmueble" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    marginVertical: 20,
  },
  input: {
    height: 48,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
    padding: 9,
  },
});
