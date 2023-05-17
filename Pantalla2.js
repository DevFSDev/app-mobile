import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image, Linking } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import PantallasContext from './PantallasContext';

export default function Pantalla2({ navigation }) {
  const { text, setText } = useContext(PantallasContext);
  const { name, setName } = useContext(PantallasContext);
  const { surnames, setSurnames } = useContext(PantallasContext);
  const { email, setemail } = useContext(PantallasContext);
  const { location, setLocation } = useContext(PantallasContext);
  const { score, setScore } = useContext(PantallasContext);


  const handleEmailPress = () => {
    const url = `mailto:${email}`;
    Linking.openURL(url);
  };


  useEffect(() => {
    leerScore();
  }, []);


  // Función utilizada para mostrar todas las skills de un usuario en particular.
  let leerScore = async () => {
    // Le damos 3 milisegundos para que a la base de datos le de tiempo a responder.

    try {
      // Introducimos la url con el nickname recibido de la pantalla1.
      const response = await fetch("http://192.168.55.50:9000/user/score?nickname=" + text, {
        method: "GET"
      });
      if (response.ok) {
        const data = await response.json();
        setScore(data.data)

      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecera}>
        <View style={styles.container_sup}>
          <Image
            style={styles.image}
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6378/6378141.png' }}
            resizeMode='cover'
          />
          <View style={styles.infoContainer}>
            <View style={styles.nombreApellido}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.surname}> {surnames}</Text>
            </View>
            <TouchableOpacity onPress={handleEmailPress}>
              <Text style={styles.email}>{email}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container_inf}>
          <Text style={{ marginTop: 15, flex: 1, textAlign: 'center' }}>{location}</Text>
          <Text style={{ marginTop: 15, flex: 1, textAlign: 'center' }}>Score: {score}</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={() => { navigation.navigate('Habilidades') }} style={{ backgroundColor: '#FA8072', padding: 20, borderRadius: 5, marginBottom: 10, marginTop: 20, width: 300, alignItems: 'center' }}>
          <Text style={{ fontSize: 20 }}>Habilidades</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

  },
  container_sup: {
    flexDirection: 'row',
    paddingBottom: 10
  },
  container_inf: {
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 15,
    color: '#888',
  },
  cabecera: {
    alignItems: 'center',
    padding: 16,
    flexDirection: 'column',
    borderColor: 'black',
    borderBottomWidth: 3
  },
  nombreApellido: {
    flexDirection: 'row'
  },
  surname: {
    marginTop: 5
  }
});