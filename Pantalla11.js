import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import PantallasContext from './PantallasContext';

export default function Pantalla11({ navigation }) {
  const { project, setProject } = useContext(PantallasContext);
  const [datesProject, setDatesproject] = useState([]);
  const [datesCapabilitys, setDatescapabilitys] = useState([]);

  // Hook para llamar a la función leerProyectos cada vez que se muestre la página.
  useEffect(() => {
    leerProyectos();
  }, []);

  // Función utilizada para leer aquellos proyectos que tengan ese id_project.
  let leerProyectos = async () => {
    try {
      const response = await fetch("http://172.20.10.2:9000/project?id_project=" + project, {
        method: "GET"
      });
      if (response.ok) {
        console.log("Recibiendo datos")
        const data = await response.json();
        let newData = [];
        const item = data.data;


        newData.push({
          economic: item.economic
        });
        setDatesproject(newData)
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <ScrollView style={{ width: 360 }}>
      <View>
        {datesProject.length > 0 ? (
          datesProject.map((item, index) => (
            <View key={item._id}>
              <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Económico:</Text>
                {item.economic.map((economicItem, economicIndex) => (
                  <View style={{ marginTop: 10 }} key={economicIndex}>
                    <Text>Categoría: {economicItem.category}</Text>
                    <Text>Concepto: {economicItem.amount}</Text>
                  </View>
                ))}
            </View>
          ))
        ) : (
          <Text>No hay datos disponibles</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  boxes: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#FFEBCD",
    flexDirection: "row",
    justifyContent: 'center',
  },
  text: {
    fontWeight: "bold",
  }
});
