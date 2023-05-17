import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import PantallasContext from './PantallasContext';

export default function Pantalla1({ navigation }) {
  const { text, setText } = useContext(PantallasContext);
  const { name, setName } = useContext(PantallasContext);
  const { surnames, setSurnames } = useContext(PantallasContext);
  const { email, setemail } = useContext(PantallasContext);
  const { location, setLocation } = useContext(PantallasContext);
  const [employeeData, setEmployeeData] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Hook useEffect(), cada vez que se actualiza el campo de busqueda llamará a la función leerBDD().
  useEffect(() => {
    leerBDD();
  }, [busqueda]);

  // Función utilizada para leer de la base de datos todos los usuarios e introducirlos en un array con clave/valor.
  let leerBDD = async () => {
    try {
      const response = await fetch("http://192.168.55.50:9000/user/listUsers", {
        method: "GET"
      });
      if (response.ok) {
        console.log("Recibiendo datos")
        const data = await response.json();
        let newData = [];

        for (let i = 0; i < data.data.length; i++) {
          const item = data.data[i];
          
          // Filtramos la búsqueda introducida por el usuario.
          if (item.name.toLowerCase().startsWith(busqueda.toLowerCase())) {
            newData.push({
              name: item.name,
              surnames: item.surnames,
              hireDate: item.hireDate,
              nickname: item.nickname,
              email: item.email,
              location: item.location,
              typeOfContract: item.typeOfContract
            });
          }
        }

        setEmployeeData(newData)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Total personas mostradas: {employeeData.length}</Text>
      <TextInput // TextImput para que usuario introduzca la búsqueda.
        style={{ height: 40, marginTop: 10, marginBottom: 10, borderBottomWidth: 1 }}
        placeholder="Introduce el nombre a buscar..."
        onChangeText={(newText) => setBusqueda(newText)}
        defaultValue={''}
      />
      <ScrollView style={{ width: 360 }}>
        <View /* View utilizado para mostrar los nombres y fecha de incorporación de la plantilla */>
          {employeeData.length > 0 ? (
            employeeData.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => { setText(item.nickname); navigation.navigate('Menú'); setName(item.name); setSurnames(item.surnames), setemail(item.email), setLocation(item.location) }}>
                <View style={styles.boxes}>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.image}
                      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6378/6378141.png' }}
                      resizeMode='cover'
                    />
                  {item.typeOfContract != 'Interno' ? <View style={styles.marcador} /> : null}
                  </View>
                  <View>
                    <Text style={styles.names}> {item.name} {item.surnames}</Text>
                    <Text style={styles.hireDate}>  {item.email}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No hay datos disponibles</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxes: {
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#FFDEAD",
    flexDirection: "row"
  },
  names: {
    fontWeight: '700',
    fontSize: 20,
  },
  text_boxes: {
    paddingVertical: 20,
    fontWeight: 'bold'
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 16,
    marginLeft: 10,
  },
  marcador: {
    position: 'absolute',
    top: 20,
    left: 40,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#32CD32',
  },
  imageContainer: {
    position: 'relative',
  }
});
