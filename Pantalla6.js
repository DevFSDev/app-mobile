import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import PantallasContext from './PantallasContext';
import ColorBox from './ColorBox';

export default function Pantalla4({ navigation }) {
    const [employeeData, setEmployeeData] = useState([]);
    const [skillsData, setSkillsData] = useState([]);
    const [skills, setSkills] = useState([]);
    const { text, setText } = useContext(PantallasContext);
    const [skillLevels, setSkillLevels] = useState({});
    const [arraySkill, setArraySkill] = useState([]);
    const [arrayLevel, setArrayLevel] = useState([]);
    const [indices, setIndices] = useState([]);

    // Funciones utilizadas para que cuando se le pasen la skill y el nivel reconozca los botones que ya han sido pulsados con anterioridad.
    // Hace que se queden marcados los niveles de cada skill.

    const handleSkillLevelChange = (skill, level) => {
        setSkillLevels((prevSkillLevels) => ({
            ...prevSkillLevels,
            [skill]: level,
        }));
    };

    const handleSkillLevelChange2 = () => {
        const newSkillLevels = {};
        for (let i = 0; i < indices.length; i++) {
            newSkillLevels[employeeData[i]] = skillsData[i];
        }
        setSkillLevels(newSkillLevels);
    };

    useEffect(() => {
        leerSkills();
    }, []);

    useEffect(() => {
        handleSkillLevelChange2();
    }, [indices]);

    useEffect(() => {
        leerBDD();
    }, [employeeData]);

    // Constante utilizada para saber a que grupo de colores va cada departamento.
    const departmentColorMap = {
        Desarrollo: 1,
        Sistemas: 2,
        Operaciones: 3,
        Calidad: 4,
        Diseño: 5,
        Comunicación: 6,
    };

    // Función utilizada para saber todas las skills que hay en la base de datos.
    const leerBDD = async () => {
        try {
            const response = await fetch("http://172.20.10.2:9000/skill/listall", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                const newData = [];
                const arrayIndice = [];

                data.data.forEach((item, index) => {
                    const color = departmentColorMap[item.department] || 8;
                    let aux = 0;

                    if (employeeData.includes(item.skill)) {
                        aux = 7;
                        arrayIndice.push(index);
                    }

                    newData.push({
                        skill: item.skill,
                        color,
                        aux,
                    });
                });
                setSkills(newData);
                setIndices(arrayIndice);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Función utilizada para que cuando reciba una url lee los arrays de skill y level y se las pasa a la API.
    const enviarConsultaPost = async (url) => {
        const body = {
            skillArray: arraySkill,
            levelArray: arrayLevel,
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const leerSkillArray = async (level, skill) => {
        setArraySkill((prevArraySkill) => [...prevArraySkill, { name: skill }]);
        setArrayLevel((prevArrayLevel) => [...prevArrayLevel, { value: level }]);
    };

    const guardar = async () => {
        const url = `http://172.20.10.2v:9000/user/skillArray?nickname=${text}`;
        enviarConsultaPost(url);
    };


    // Función utilizada para mostrar todas las skills de un usuario en particular.
    let leerSkills = async () => {
        try {
            // Introducimos la url con el nickname recibido de la pantalla1.
            const response = await fetch("http://172.20.10.2:9000/user/skill?nickname=" + text, {
                method: "GET"
            });
            if (response.ok) {
                const data = await response.json();

                let respuesta = data.data;
                const keys = Object.keys(respuesta);
                const value = Object.values(respuesta);
                setEmployeeData(keys);
                setSkillsData(value)
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Constante utilizada para devolver el color dependiendo de su nivel (departamento).
    const getColorForLevel = (level) => {
        const colorMap = {
            1: '#8C100C',
            2: '#00554E',
            3: '#192137',
            4: '#215968',
            5: '#984807',
            6: '#403152',
            8: 'black',
            default: '#2F4F4F',
        };

        return colorMap[level] || colorMap.default;
    };

    // Función que recibe la skill, el nivel(departamento), cual de los niveles se ha pulsado y el color que se le asigna.
    const SkillButton = ({ skill, level, onPress, color }) => {
        return (
            <TouchableOpacity
                style={[
                    styles.botonesSelecTodos,
                    {  backgroundColor: skillLevels[skill] === level ? "#FFFACD" : color === 1 ? getColorForLevel(1) : color === 2 ? getColorForLevel(2) : color === 3 ? getColorForLevel(3) :
                        color === 4 ? getColorForLevel(4) : color === 5 ? getColorForLevel(5) : color === 6 ? getColorForLevel(6) : color === 8 ? getColorForLevel(7) : null  },
                    { borderWidth: 2 },
                ]}
                onPress={onPress}
            >
                <Text style={{ color: skillLevels[skill] === level ? 'black' : 'white', fontWeight: 'bold' }}>
                    Nivel {level}
                </Text>
            </TouchableOpacity>
        );
    };



    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", }}>
                <ColorBox color="#FFFACD" />
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Skills asociadas</Text>
            </View>
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
            <FlatList
                data={skills}
                renderItem={({ item }) => (
                    <View style={{
                        flexDirection: "row", borderColor: "black", marginBottom: 10, padding: 10, borderRadius: 10, borderWidth: 2,
                        backgroundColor: item.color === 1 ? "#EF4641" :
                            item.color === 2 ? "#00AA9B" :
                                item.color === 3 ? "#91A0CC" :
                                    item.color === 4 ? "#4BACC6" :
                                        item.color === 5 ? "#F79646" :
                                            item.color === 6 ? "#8064A2" :
                                                item.color === 7 ? "#FFD700" :
                                                    item.color === 8 ? "#FFFFFF" :
                                                        "white"
                    }}>
                        <View>
                            <Text style={[styles.names, { textAlign: 'center' }]}> {item.skill}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 6 }}>
                                <SkillButton
                                    color={item.color}
                                    skill={item.skill}
                                    level={1}
                                    onPress={() => {
                                        handleSkillLevelChange(item.skill, 1);
                                        leerSkillArray(1, item.skill);
                                    }}
                                />
                                <SkillButton
                                    color={item.color}
                                    skill={item.skill}
                                    level={2}
                                    onPress={() => {
                                        handleSkillLevelChange(item.skill, 2);
                                        leerSkillArray(2, item.skill);
                                    }}
                                />
                                <SkillButton
                                    color={item.color}
                                    skill={item.skill}
                                    level={3}
                                    onPress={() => {
                                        handleSkillLevelChange(item.skill, 3);
                                        leerSkillArray(3, item.skill);
                                    }}
                                />
                                <SkillButton
                                    color={item.color}
                                    skill={item.skill}
                                    level={4}
                                    onPress={() => {
                                        handleSkillLevelChange(item.skill, 4);
                                        leerSkillArray(4, item.skill);
                                    }}
                                />
                            </View>
                        </View>
                    </View>

                )
                }
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => <Text>No hay datos disponibles</Text>}
            />

            < View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={[styles.botonGuardar, { backgroundColor: "#00FF7F" }]} onPress={() => { guardar(), navigation.navigate('Habilidades') }} >
                    <Text style={{ fontWeight: 'bold', color: "black" }}>Guardar cambios</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.botonGuardar, { backgroundColor: "#DC143C" }]} onPress={() => { navigation.navigate('Habilidades') }} >
                    <Text style={{ fontWeight: 'bold', color: "white", textAlign: 'center' }}>Volver atrás</Text>
                </TouchableOpacity>
            </View >
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    names: {
        fontWeight: '700',
        fontSize: 25,
    },
    values: {
        fontWeight: '700',
        fontSize: 20,
    },
    nickname: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 30,
        marginTop: 10,
    },
    button: {
        marginLeft: 300,
    },
    botonesSelecTodos: {
        padding: 15,
        marginRight: 5,
        borderRadius: 5,
        borderRadius: 50
    },
    botonGuardar: {
        padding: 20,
        borderWidth: 2,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 20,
        width: 160,
        height: 60,
    }
});