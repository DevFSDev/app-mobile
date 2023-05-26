import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import PantallasContext from './PantallasContext';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';


export default function Pantalla3({ navigation }) {
  const { text, setText } = useContext(PantallasContext);
  const [employeeData, setEmployeeData] = useState([]);
  const [success, setSuccess] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [skillEliminar, setSkillEliminar] = useState("");
  const [skillActualizar, setSkillActualizar] = useState("");
  const { name, setName } = useContext(PantallasContext);
  const { surnames, setSurnames } = useContext(PantallasContext);
  const { error, setError } = useContext(PantallasContext);
  const { score, setScore } = useContext(PantallasContext);


  // Constante que hace referencia a los colores del nivel de habilidad.
  const backgroundColorMap = {
    1: "#FA8072",
    2: "#F08080",
    3: "#FFA07A",
    4: "#FF8C00",
  };

  // Constante para hacer visible el modal.
  const modalEliminar = () => {
    setIsModalVisible(!isModalVisible);
  }

  // Constante para hacer visible el segundo modal.
  const modalActualizar = () => {
    setIsModalVisible2(!isModalVisible2);
  }

  // Hook useEffect(), cada vez que se muestra la pantalla2.js renderiza la función leerBDD().
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      leerBDD();
    });

    return unsubscribe;
  }, [navigation]);


  // Función utilizada para mostrar todas las skills de un usuario en particular.
  let leerScore = async () => {

    try {
      // Introducimos la url con el nickname recibido de la pantalla1.
      const response = await fetch("http://172.20.10.2:9000/user/score?nickname=" + text, {
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

  // Función utilizada para mostrar todas las skills de un usuario en particular.
  let leerBDD = async () => {
    // Le damos 3 milisegundos para que a la base de datos le de tiempo a responder.
    setTimeout(async () => {
      try {
        // Introducimos la url con el nickname recibido de la pantalla1.
        const response = await fetch("http://172.20.10.2:9000/user/skill?nickname=" + text, {
          method: "GET"
        });
        if (response.ok) {
          console.log("Recibiendo datos");
          const data = await response.json();

          // Ordenamos las skills de mayor a menor nivel.
          let sortedEmployeeData = Object.entries(data.data)
            .sort((a, b) => b[1] - a[1])
            .reduce((obj, [key, value]) => {
              obj[key] = value;
              return obj;
            }, {});
          setEmployeeData(sortedEmployeeData);
        }
      } catch (error) {
        console.log(error);
      }
    }, 300);

  };

  // Función que recoge por argumentos la skill pulsada y el nivel para poder eliminarla de la base de datos.
  let handleLongPress = async (skill, result) => {
    if (result === "yes") {
      try {
        let response;
        // Para la skill C++ tenemos que enviarlos con este formato.
        if (skill === "C++") {
          response = await fetch(`http://172.20.10.2:9000/user/delSkill?nickname=${text}&skill=C%2B%2B`, {
            method: "DELETE"
          });
        } else {
          response = await fetch("http://172.20.10.2:9000/user/delSkill?nickname=" + text + "&skill=" + skill, {
            method: "DELETE"
          });
        }
        if (response.ok) {
          console.log("Recibiendo datos");
          const data = await response.json();
          setSuccess("Se ha eliminado correctamente la skill");
          setTimeout(() => {
            setSuccess("");
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    }
    // Una vez eliminada llamamos a la función leerBDD() y leerScore para que se muestre por pantalla.
    leerScore();
    leerBDD();
  };

  // Función utilizada cada vez que se mantiene pulsado sobre uno de los botones.
  let handleTwoPress = async (level, skill, nickname) => {
    try {
      let response;
      if (skill === "C++") {
        response = await fetch(`http://172.20.10.2:9000/user/skill?nickname=${nickname}&skill=C%2B%2B&level=${level}`, {
          method: "PUT"
        });
      } else {
        response = await fetch("http://172.20.10.2:9000/user/skill?nickname=" + nickname + "&skill=" + skill + "&level=" + level, {
          method: "PUT"
        });
      }

      if (response.ok) {
        console.log("Recibiendo datos");
        const data = await response.json();

        setSuccess("Se ha actualizado correctamente la skill");
        setTimeout(() => {
          setSuccess("")
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
    // Una vez actualizada llamamos a la función leerBDD() para que se muestre por pantalla.
    leerScore();
    leerBDD();
  };


  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 10 }}>Mantén pulsado para eliminar una habilidad</Text>
      <Text>Pulsa una vez para actualizar una habilidad</Text>
      <Text>Pulsa el botón "+" negro para añadir una habilidad</Text>
      <Text>Pulsa el botón "+" azul para añadir varias habilidades</Text>
      <Text style={styles.encabezadoSuccess} /* Text con el mensaje de éxito, lo recibimos desde esta misma pantalla */ >{success}</Text>
      <View style={{ flexDirection: "row", }}>
        <Text style={styles.nickname}>{name} {surnames}  </Text>
        <TouchableOpacity
          onPress={() => { navigation.navigate('Añadir habilidades'); }}>
          <AntDesign name="pluscircle" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { navigation.navigate('Añadir varias habilidades'); }}>
          <AntDesign name="pluscircle" size={40} marginLeft={5} color="blue" />
        </TouchableOpacity>
      </View>
      <Text /* Text con el mensaje que recibimos de la pantalla 3 */ style={error === 'ok' ? styles.encabezadoSuccess : styles.encabezadoError}>
        {error === 'ok' ? 'Se ha insertado correctamente la skill' : error}
      </Text>
      <ScrollView style={{ height: '70%', width: 300 }}>
        <View>
          {Object.entries(employeeData).length > 0 ? (
            Object.entries(employeeData).map(([key, index]) => (
              <View >
                <TouchableWithoutFeedback
                  // Si se pulsa prolongado llamamos a modalEliminar().
                  onLongPress={() => { modalEliminar(), setSkillEliminar(key) }}
                  // Si se pulsa dos veces llamamos a modalActualizar().
                  onPress={() => {
                    setSkillActualizar(key);
                    modalActualizar();
                  }}>
                  <View style={{ backgroundColor: backgroundColorMap[index], marginBottom: 10, flexDirection: "row", borderWidth: 2, padding: 10, justifyContent: "space-between", borderRadius: 10 }}>
                    <Text style={styles.names}> {key}</Text>
                    <Text style={styles.values}> {index}</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            ))
          ) : (
            <Text>No tiene skills introducidas</Text>
          )}
        </View>
      </ScrollView>
      <Modal /* Modal utilizado para cuando se mantiene pulsado una skill, preguntar si se quiere eliminar */
        style={{ backgroundColor: " rgba(255, 239, 213, 0.9).", margin: 0 }} isVisible={isModalVisible} onBackdropPress={modalEliminar}>
        <Text style={{ fontSize: 25, fontWeight: '700', marginBottom: 10, marginTop: 10, textAlign: "center", color: "black" }}>¿Estás seguro que quieres eliminar esa skill?</Text>
        <TouchableOpacity
          style={{ marginBottom: 10, borderWidth: 2, padding: 10, borderRadius: 10, backgroundColor: "#00FF7F" }}
          onPress={() => { handleLongPress(skillEliminar, "yes"), setIsModalVisible(false) }}
        >
          <Text style={{ textAlign: "center" }}>YES</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginBottom: 10, borderWidth: 2, padding: 10, borderRadius: 10, backgroundColor: "#FF6347" }}
          onPress={() => { handleLongPress(skillEliminar, "no"), setIsModalVisible(false) }}
        >
          <Text style={{ textAlign: "center" }}>NO</Text>
        </TouchableOpacity>
      </Modal>

      <Modal /* Modal utilizado para cuando se pulsa dos veces una skill, preguntar si se quiere actualizar */
        style={{ backgroundColor: " rgba(255, 239, 213, 0.9).", margin: 0 }} isVisible={isModalVisible2} onBackdropPress={modalActualizar}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.tituloModal}>¿Quieres actualizar el valor de la skill?</Text>
          <TouchableOpacity onPress={() => { setIsModalVisible2(false); handleTwoPress("1", skillActualizar, text) }} style={{ backgroundColor: '#FA8072', padding: 20, borderRadius: 5, marginBottom: 10 }}>
            <Text>Nivel 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setIsModalVisible2(false); handleTwoPress("2", skillActualizar, text) }} style={{ backgroundColor: '#F08080', padding: 20, borderRadius: 5, marginBottom: 10 }}>
            <Text>Nivel 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setIsModalVisible2(false); handleTwoPress("3", skillActualizar, text) }} style={{ backgroundColor: '#FFA07A', padding: 20, borderRadius: 5, marginBottom: 10 }}>
            <Text>Nivel 3</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setIsModalVisible2(false); handleTwoPress("4", skillActualizar, text) }} style={{ backgroundColor: '#FF8C00', padding: 20, borderRadius: 5, marginBottom: 10 }}>
            <Text>Nivel 4</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setIsModalVisible2(false) }} style={{ backgroundColor: '#E6E6FA', padding: 20, borderRadius: 5, marginBottom: 10, marginTop: 10 }}>
            <Text>Cerrar sin aplicar cambios</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tituloModal: {
    fontSize: 25,
    fontWeight: '700',
    marginTop: 100,
    textAlign: "center",
    color: "black",
    marginBottom: 20,
  },
  names: {
    fontWeight: '700',
    fontSize: 20,
  },
  values: {
    fontWeight: '700',
    fontSize: 20,
  },
  nickname: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 10,
  },
  encabezadoError: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 10,
    color: "#FF6347"
  },
  encabezadoSuccess: {
    fontSize: 15,
    fontWeight: '700',
    color: "#00FF7F"
  },
});