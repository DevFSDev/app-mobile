import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image } from 'react-native';
import { useContext } from 'react';
import PantallasContext from './PantallasContext';

export default function Pantalla8({ navigation }) {
  const { project, setProject } = useContext(PantallasContext);
  const [datesProject, setDatesproject] = useState([]);
  const [datesCapabilitys, setDatescapabilitys] = useState([]);


  useEffect(() => {
    leerProyectos();
    leerCapabilitys();
  }, []);


  let leerProyectos = async () => {
    try {
      const response = await fetch("http://192.168.55.50:9000/project?id_project=" + project, {
        method: "GET"
      });
      if (response.ok) {
        console.log("Recibiendo datos")
        const data = await response.json();
        let newData = [];
        const item = data.data;


        newData.push({
          _id: item._id,
          name: item.name,
          client: item.client,
          keyProject: item.keyProject,
          status: item.status,
          datesStart: item.dates.start,
          datesEnd: item.dates.end,
          datesLiabilities: item.dates.liabilities,
          economic: item.economic
        });
        setDatesproject(newData)
      }
    } catch (error) {
      console.log(error);
    }
  };

  let leerCapabilitys = async () => {
    try {
      console.log(project)
      const response = await fetch("http://192.168.55.50:9000/project/capability?id_project=" + project, {
        method: "GET"
      });
      if (response.ok) {
        console.log("Recibiendo datos")
        const data = await response.json();
        let newData = [];
        const item = data.data;

        for (let i = 0; i < item.length; i++) {
          newData.push({
            _id: item[i]._id,
            experience: item[i].experience,
            idProject: item[i].idProject,
            level: item[i].level,
            part: item[i].part,
            project: item[i].project,
            skill: item[i].skill
          });
        }
        setDatescapabilitys(newData)
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <ScrollView style={{ width: 360 }}>
      <Text style={styles.encabezado}>Proyecto: </Text>
      <View>
        {datesProject.length > 0 ? (
          datesProject.map((item, index) => (
            <View style={styles.boxes2} key={item._id}>
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.text}>ID del proyecto: </Text>
                <Text>{item._id}</Text>
                <Text style={styles.text}>Nombre del proyecto: </Text>
                <Text>{item.name}</Text>
                <Text style={styles.text}>Nombre del cliente: </Text>
                <Text>{item.client}</Text>
                <Text style={styles.text}>Clave del proyecto: </Text>
                <Text>{item.keyProject}</Text>
                <Text style={styles.text}>Estado: </Text>
                <Text>{item.status}</Text>
                <Text style={{ marginTop: 10, fontWeight: 'bold', marginBottom: 10 }}>Fechas: </Text>
                <Text>Fecha de inicio: {item.datesStart}</Text>
                <Text>Fecha de fin: {item.datesEnd}</Text>
                <Text>Fecha limite: {item.datesLiabilities}</Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Económico:</Text>
                {item.economic.map((economicItem, economicIndex) => (
                  <View style={{ marginTop: 10 }} key={economicIndex}>
                    <Text>Categoría: {economicItem.category}</Text>
                    <Text>Concepto: {economicItem.amount}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))
        ) : (
          <Text>No hay datos disponibles</Text>
        )}
      </View>
      <View>
      <Text style={styles.encabezado}>Competencias:</Text>
        {datesCapabilitys.length > 0 ? (
          datesCapabilitys.map((item, index) => (
            <View style={styles.boxes} key={item._id}>
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.text}>Nombre del proyecto: </Text>
                <Text>{item.project}</Text>
                <Text style={styles.text}>Nivel: </Text>
                <Text>{item.level}</Text>
                <Text style={styles.text}>Participación: </Text>
                <Text>{item.part}</Text>
                <Text style={styles.text}>Habilidad: </Text>
                <Text>{item.skill}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text>No hay competencias disponibles</Text>
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
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#FFEBCD",
    flexDirection: "row"
  },
  boxes2: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#FFDEAD",
    flexDirection: "row"
  },
  text: {
    fontWeight: "bold",
    marginTop: 5,
  },
  encabezado: {
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10
  }

});
