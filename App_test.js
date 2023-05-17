import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const Screen1 = () => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    leerBDD();
  }, []);

  let leerBDD = async () => {
    try {
      const response = await fetch("http://192.168.85.50:9000/user/listUsers", {
        method: "GET"
      });
      if (response.ok) {
        console.log("Recibiendo datos")
        const data = await response.json();

        let newData = [];

        for (let i = 0; i < data.data.length; i++) {
          newData.push({
            name: data.data[i].name,
            surnames: data.data[i].surnames,
            hireDate: data.data[i].hireDate
          })
        }
        setEmployeeData(newData)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: 350 }}>
        <View>
          {employeeData.length > 0 ? (
            employeeData.map((item, index) => (
              <TouchableOpacity onPress={() => navigation.navigate('NuevaPantalla')}>
              <View style={styles.boxes} key={index}>
                <AntDesign name="iconfontdesktop" size={40} color="black" marginTop={5} marginRight={10} marginLeft={10} />
                <View>
                  <Text style={styles.names}> {item.name} {item.surnames}</Text>
                  <Text style={styles.hireDate}>  Fecha de incorporación: {item.hireDate}</Text>
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
    marginTop: 50,
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
  hireDate: {

  },
  text_boxes: {
    paddingVertical: 20,
    fontWeight: 'bold'
  }
});

export default Screen1;