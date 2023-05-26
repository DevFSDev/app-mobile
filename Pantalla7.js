import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import PantallasContext from './PantallasContext';

export default function Pantalla1({ navigation }) {

  const [employeeData, setEmployeeData] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const { project, setProject } = useContext(PantallasContext);

  // Hook useEffect(), cada vez que se actualiza el campo de busqueda llamará a la función leerBDD().
  useEffect(() => {
    leerBDD();
  }, []);


  let leerBDD = async () => {
    try {
      const response = await fetch("http://192.168.55.50:9000/project/list", {
        method: "GET"
      });
      if (response.ok) {
        console.log("Recibiendo datos")
        const data = await response.json();
        let newData = [];

        for (let i = 0; i < data.data.length; i++) {
          const item = data.data[i];
          // Filtramos la búsqueda introducida por el usuario.
          newData.push({
            name: item.name,
            id: item._id
          });
        }

        setEmployeeData(newData)
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <ScrollView style={{ width: 360 }}>
      <View style={{marginLeft: 10, marginRight: 10}}>
        {employeeData.length > 0 ? (
          employeeData.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => { setProject(item.id); navigation.navigate('Detalle proyectos') }}>
              <View style={styles.boxes}>
                <View>
                  <Text style={styles.names}> {item.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No hay datos disponibles</Text>
        )}
      </View>
    </ScrollView>
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
    paddingTop: 10,
    paddingBottom: 10,
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
  image: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 16,
    marginLeft: 10,
  }
});
