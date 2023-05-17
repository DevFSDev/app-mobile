import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import PantallasContext from './PantallasContext';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import ColorBox from './ColorBox';



export default function Pantalla4({ navigation }) {
    const [skills, setSkills] = useState([]);
    const [skillPulsada, setSkillPulsada] = useState("");
    const [puntuacionPulsada, setPuntuacionPulsada] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { text, setText } = useContext(PantallasContext);
    const { error, setError } = useContext(PantallasContext);
    const { score, setScore } = useContext(PantallasContext);
    const {skillLevel, setSkillLevel} = useContext(PantallasContext);


    // Constante para hacer visible el modal.
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    }
    // Hook useEffect, se utiliza cuando se muestra la pantalla llame a la función leerBDD().
    useEffect(() => {
        leerBDD();
    }, []);

    // Hook useEffect, se utiliza cuando la variable puntuacionPulsada tiene contenido y asi rellenamos el campo url.
    useEffect(() => {
        if (puntuacionPulsada) {
            let url = "";
            if (skillPulsada === "C++") {
                url = `http://192.168.55.50:9000/user/skill?nickname=${text}&skill=C%2B%2B&level=${puntuacionPulsada}`;
            } else {
                url = `http://192.168.55.50:9000/user/skill?nickname=${text}&skill=${skillPulsada}&level=${puntuacionPulsada}`;
            }
            enviarConsultaPost(url);
        }
    }, [puntuacionPulsada]);

    // Función utilizada para leer todas las skills disponibles.
    let leerBDD = async () => {
        console.log("test")
        try {
            const response = await fetch("http://192.168.55.50:9000/skill/listall", {
                method: "GET"
            });
            if (response.ok) {
                console.log("Recibiendo datos")
                const data = await response.json();
                console.log(data)
                let newData = [];

                for (let i = 0; i < data.data.length; i++) {
                    const item = data.data[i];
                    let color = 0;
                    if (data.data[i].department == "Desarrollo") {
                        color = 1;
                    } else if (data.data[i].department == "Sistemas") {
                        color = 2;
                    } else if (data.data[i].department == "Operaciones") {
                        color = 3;
                    } else if (data.data[i].department == "Calidad") {
                        color = 4;
                    } else if (data.data[i].department == "Diseño") {
                        color = 5;
                    } else if (data.data[i].department == "Comunicación") {
                        color = 6;
                    } else {
                        color = 7;
                    }
                    newData.push({
                        skill: item.skill,
                        color: color
                    });
                }
                console.log(newData)
                setSkills(newData)
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Función que recibe la url de la consulta para añadir a la base de datos la skill y el valor seleccionado.
    const enviarConsultaPost = async (url) => {
        try {
            const response = await fetch(url, {
                method: "POST"
            });
            if (response.ok) {
                const data = await response.json();
                setError("ok");

                // Mostramos el mensaje 3 segundos para la pantalla 2.
                setTimeout(() => {
                    setError("");
                }, 3000);
                // En caso de que arroje un error lo mostramos.    
            } else {
                const responseData = await response.json();
                const errorMessage = responseData.message || response.statusText;
                setError(errorMessage);

                // Mostramos el mensaje 3 segundos para la pantalla 2.
                setTimeout(() => {
                    setError("");
                }, 3000);
            }

            setSkillPulsada("");
            setPuntuacionPulsada("");
            leerScore();

        } catch (error) {
            console.log(error);
        }
    };


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
            <Text style={{ marginBottom: 20, marginTop: 10, fontSize: 15, fontWeight: '700', }}>Departamentos: </Text>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", }}>
                <ColorBox color="#EF4641" />    
                <Text>Desarrollo</Text>
                <ColorBox color="#00AA9B" />
                <Text>Sistemas</Text>
                <ColorBox color="#91A0CC" />
                <Text>Operaciones</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", marginBottom: 10 }}>
                <ColorBox color="#4BACC6" />
                <Text>Calidad</Text>
                <ColorBox color="#F79646" />
                <Text>Diseño</Text>
                <ColorBox color="#8064A2" />
                <Text>Comunicación</Text>
                <ColorBox color="#FFFFFF" />
                <Text>CAU</Text>
            </View>
            <ScrollView style={{ width: 350, flex: 1 }}>
                <View /* View para que en el caso de que tenga skills se mostrarán por pantalla*/ >
                    {skills.length > 0 ? (
                        skills.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => { setSkillPulsada(item.skill); { toggleModal() } }}>
                                <View style={{
                                    flexDirection: "row", borderColor: "black", marginBottom: 10, padding: 10, borderRadius: 10, borderWidth: 2,
                                    backgroundColor: item.color === 1 ? "#EF4641" :
                                        item.color === 2 ? "#00AA9B" :
                                            item.color === 3 ? "#91A0CC" :
                                                item.color === 4 ? "#4BACC6" :
                                                    item.color === 5 ? "#F79646" :
                                                        item.color === 6 ? "#8064A2" :
                                                            item.color === 7 ? "#FFFFFF" :
                                                                "white"
                                }}>
                                    <AntDesign name="barschart" size={40} color="black" marginTop={5} marginRight={10} marginLeft={10} />
                                    <View>
                                        <Text style={styles.names}> {item.skill}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text>No hay datos disponibles</Text>
                    )}
                </View>
            </ScrollView>
            <Modal /* Modal utilizado para mostrar la puntuación que se quiere insertar */
                style={{ backgroundColor: " rgba(255, 239, 213, 0.9).", margin: 0 }} isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.tituloModal}>Proporciona un nivel de habilidad</Text>
                    <TouchableOpacity onPress={() => { setIsModalVisible(false); setPuntuacionPulsada("1"); navigation.navigate('Habilidades') }} style={{ backgroundColor: '#FA8072', padding: 20, borderRadius: 5, marginBottom: 10 }}>
                        <Text>Nivel 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setIsModalVisible(false); setPuntuacionPulsada("2"); navigation.navigate('Habilidades') }} style={{ backgroundColor: '#F08080', padding: 20, borderRadius: 5, marginBottom: 10 }}>
                        <Text>Nivel 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setIsModalVisible(false); setPuntuacionPulsada("3"); navigation.navigate('Habilidades') }} style={{ backgroundColor: '#FFA07A', padding: 20, borderRadius: 5, marginBottom: 10 }}>
                        <Text>Nivel 3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setIsModalVisible(false); setPuntuacionPulsada("4"); navigation.navigate('Habilidades') }} style={{ backgroundColor: '#FF8C00', padding: 20, borderRadius: 5, marginBottom: 10 }}>
                        <Text>Nivel 4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setIsModalVisible(false); navigation.navigate('Habilidades') }} style={{ backgroundColor: '#E6E6FA', padding: 20, borderRadius: 5, marginBottom: 10, marginTop: 10 }}>
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
        flex: 1
    },
    boxes: {
        marginBottom: 10,
        borderColor: "black",
        borderWidth: 2,
        backgroundColor: "#FA8072",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderRadius: 10,
    },
    names: {
        fontWeight: '700',
        fontSize: 30,
    },
    tituloModal: {
        fontSize: 25,
        fontWeight: '700',
        marginBottom: 10,
        marginTop: 10,
        textAlign: "center",
        color: "black"
    },
    values: {
        fontWeight: '700',
        fontSize: 20,
    },
    encabezado: {
        fontSize: 25,
        fontWeight: '700',
        marginBottom: 10,
        marginTop: 10,
    },
    nickname: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 30,
        marginTop: 10,
    },
    text_boxes: {
        paddingVertical: 20,
        fontWeight: 'bold'
    },
    button: {
        marginLeft: 300,
    }
});