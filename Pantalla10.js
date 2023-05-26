import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import PantallasContext from './PantallasContext';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Pantalla10({ navigation }) {
  const { project, setProject } = useContext(PantallasContext);
  const [datesProject, setDatesproject] = useState([]);
  const [datesCapabilitys, setDatescapabilitys] = useState([]);

  // Hook para llamar a la funcion leerCapabilitys cada vez que se muetra la página.
  useEffect(() => {
    leerCapabilitys();
  }, []);


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
    <ScrollView style={{ width: 360 }}>
      <View style={styles.boxPrincipal}>
        {datesCapabilitys.length > 0 ? (
          datesCapabilitys.map((item, index) => (
            <View>
              <View style={[styles.boxes, { backgroundColor: item.level === 1 ? "#FA8072" : item.level === 2 ? "#F08080" : item.level === 3 ? "#FFA07A" : item.level === 4 ? "#FF8C00" : null }]} key={item._id}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Ionicons style={{ padding: 10 }} name="person" size={30} color="black" />
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.namesSkills}>{item.skill}</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.namesSkills2}>Nivel </Text>
                      {item.level === 1 ? (
                        <View style={{ alignSelf: 'flex-end' }}>
                          <MaterialCommunityIcons name="circle-slice-2" size={22} color="black" style={{marginBottom: 3}} />
                        </View>
                      ) : item.level === 2 ? (
                        <View style={{ alignSelf: 'flex-end' }}>
                          <MaterialCommunityIcons name="circle-slice-4" size={22} color="black" style={{marginBottom: 3}} />
                        </View>
                      ) : item.level === 3 ? (
                        <View style={{ alignSelf: 'flex-end' }}>
                          <MaterialCommunityIcons name="circle-slice-6" size={22} color="black" style={{marginBottom: 3}} />
                        </View>
                      ) : item.level === 4 ? (
                        <View style={{ alignSelf: 'flex-end' }}>
                          <MaterialCommunityIcons name="circle-slice-8" size={22} color="black" style={{marginBottom: 3}}/>
                        </View>
                      ) : null}
                    </View>
                  </View>
                  <View >

                  </View>
                  <View style={{ alignSelf: 'flex-end', flex:0.8, marginLeft: 100, opacity: 0.4 }}>
                    <Text style={styles.namesSkills}>{item.part * 100}%</Text>
                  </View>
                </View>
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
  boxes: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 2,
    flexDirection: "column",
    justifyContent: 'space-between'
  },
  boxPrincipal: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    fontWeight: "bold",
  },
  names: {
    fontWeight: '700',
    fontSize: 20,
  },
  namesSkills: {
    fontWeight: '700',
    fontSize: 20,
    marginLeft: 20,
    alignItems: 'center',
  },
  namesSkills2: {
    fontWeight: '400',
    fontSize: 20,
    marginLeft: 20,
    alignItems: 'center',
  },

});
