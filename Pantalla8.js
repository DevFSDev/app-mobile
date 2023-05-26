import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import PantallasContext from './PantallasContext';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


export default function Pantalla8({ navigation }) {
  const { project, setProject } = useContext(PantallasContext);
  const [datesProject, setDatesproject] = useState([]);
  const [datesCapabilitys, setDatescapabilitys] = useState([]);
  const { text, setText } = useContext(PantallasContext);
  const { name, setName } = useContext(PantallasContext);
  const { surnames, setSurnames } = useContext(PantallasContext);
  const { email, setemail } = useContext(PantallasContext);
  const { location, setLocation } = useContext(PantallasContext);


  useEffect(() => {
    leerProyectos();
    leerCapabilitys();
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
        console.log(item)

        newData.push({
          _id: item._id,
          name: item.name,
          client: item.client,
          keyProject: item.keyProject,
          status: item.status,
          datesStart: item.dates.start,
          datesEnd: item.dates.end,
          datesLiabilities: item.dates.liabilities,
          economic: item.economic,
          description: item.description,
          nickname: item.nickname,
          projectManagerName: item.projectManagerName,
          projectManagerSurnames: item.projectManagerSurnames,
          location: item.location,
          email: item.email,

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
      const response = await fetch("http://172.20.10.2:9000/project/capability?id_project=" + project, {
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
    <View>

      {datesProject.length > 0 ? (
        datesProject.map((item, index) => (
          <View>
            <View style={styles.boxes2} key={item._id}>
              <View style={{ flexDirection: 'column', flex: 0.30 }}>
                <AntDesign name="API" size={46} color="black" style={{ textAlign: 'center' }} />
                <Text style={{textAlign: 'center', flex: 1}}>{item.keyProject}</Text>
              </View>
              <View style={{ flex: 0.7 }}>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.text2}>{item.name}</Text>
                  <View style={{ flexDirection: 'row',alignItems: 'center' }}>
                    <FontAwesome name="user" size={24} color="black" style={{ marginLeft: 40,margin: 10 }} />
                    <Text style={styles.cliente}> {item.client}</Text>
                  </View>
                </View>
              </View>
            </View>
            {item.description != undefined ? <Text style={styles.description}>{item.description}</Text> : <Text style={styles.description}>No hay descripción disponible sobre el proyecto.</Text>}

          </View>
        ))
      ) : (
        <Text>No hay datos disponibles</Text>
      )}

      {datesProject.length > 0 ? (
        datesProject.map((item, index) => (
          <View style={{ borderBottomColor: "black", borderBottomWidth: 2, marginBottom: 10 }}>
            <TouchableOpacity onPress={() => { setText(item.nickname); setName(item.projectManagerName); setSurnames(item.projectManagerSurnames); setLocation(item.location); setemail(item.email); navigation.navigate('Menú') }} style={{ flexDirection: "row" }}>
              <FontAwesome5 style={{ margin: 10 }} name="user-tie" size={24} color="black" />
              <Text style={{ margin: 12 }}>{item.projectManagerName} {item.projectManagerSurnames}</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text>No hay datos disponibles</Text>
      )}
      <TouchableOpacity onPress={() => { navigation.navigate('Fechas') }}>
        <View style={styles.boxes}>
          <Text style={styles.text}>Fechas</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('Competencias') }}>
        <View style={styles.boxes}>
          <Text style={styles.text}>Competencias</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('Económico') }}>
        <View style={styles.boxes}>
          <Text style={styles.text}>Económico</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boxes: {
    margin: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#FFEBCD",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxes2: {
    margin: 5,
    marginTop: 20,
    flexDirection: "row",
  },
  text: {
    fontWeight: "bold",
    fontSize: 14
  },
  cliente: {
    fontSize: 16,
    margin: 5,
    textAlign: 'center',
  },
  text2: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: 'center',
  },
  encabezado: {
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 12,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    margin: 10,
    textAlign: 'justify',
    paddingBottom: 10
  }

});
