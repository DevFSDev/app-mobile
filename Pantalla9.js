import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import PantallasContext from './PantallasContext';

export default function Pantalla9({ navigation }) {
  const { project, setProject } = useContext(PantallasContext);
  const [datesProject, setDatesproject] = useState([]);

  // Hook para llamar a la función leerProyectos cada vez que se muestra la página.
  useEffect(() => {
    leerProyectos();
  }, []);


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
          datesStart: item.dates.start,
          datesEnd: item.dates.end,
          datesLiabilities: item.dates.liabilities,

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
            <View style={styles.boxes2} key={item._id}>
              <View style={{ marginLeft: 20,}}>
                <View style={[styles.boxes, {backgroundColor: "#E0FFFF"}]}>
                  <View style={{ flexDirection: "row", marginTop: 10, flex:0.82  }}>
                    <Text style={styles.text}>Fecha de inicio: </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 13 }}>
                    <Text style={styles.title}>{item.datesStart} </Text>
                  </View> 
                </View>
                <View style={[styles.boxes, {backgroundColor: "#00CED1"}]}>
                  <View style={{ flexDirection: "row", marginTop: 10, flex:0.8  }}>
                    <Text style={styles.text}>Fecha de fin: </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 13}}>
                    <Text style={styles.title}>{item.datesStart}</Text>
                  </View>
                </View>
                <View style={[styles.boxes, {backgroundColor: "#C0C0C0"}]}>
                  <View style={{ flexDirection: "row", marginTop: 10, flex:0.8 }}>
                    <Text style={styles.text}>Fecha limite: </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 13 }}>
                    <Text style={styles.title}>{item.datesStart}</Text>
                  </View>
                </View>
              </View>
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
    width: 300, 
    marginBottom: 10, 
    flexDirection: "row"
  },
  boxes2: {
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 10,
    marginBottom: 10,
    marginTop: 10,
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 10


  }
});
