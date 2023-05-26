import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


export default function Pantalla5({ navigation }) {
    const [indice, setIndice] = useState(0);
    const [skillsData, setSkillsData] = useState([]);
    const [teamsData, setTeamsData] = useState([]);
    const [personData, setPersonData] = useState([]);
    const [departmentData, setDepartmentData] = useState([]);
    const [skillsData2, setSkillsData2] = useState([]);
    const [teamsData2, setTeamsData2] = useState([]);
    const [departmentData2, setDepartmentData2] = useState([]);
    const [personData2, setPersonData2] = useState([]);
    const [team, setTeam] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [skill, setSkill] = useState("");
    const [indice2, setIndice2] = useState([]);
    const [bool, setBool] = useState(false);
    const [candidadPersonas, setCandidadPersonas] = useState([]);
    const [cantidadTeam, setCantidadTeam] = useState([]);
    const [cantidadDepartment, setCantidadDepartment] = useState([]);
    const [coloresDepartamentos, setColoresDepartamentos] = useState([]);
    const [coloresTeams, setColoresTeams] = useState([]);
    const [coloresSkills, setColoresSkills] = useState([]);


    const backgroundColorMap = {
        1: "#FA8072",
        2: "#F08080",
        3: "#FFA07A",
        4: "#FF8C00",
    };

    // Hook useEffect(), cada vez que se actualiza el campo de busqueda llamará a la función leerBDD().
    useEffect(() => {
        leerDepartament();
        leerColores();
    }, []);

    useEffect(() => {
        leerTeams();
    }, [departamento]);

    useEffect(() => {
        leerSkills();
    }, [team, teamsData]);

    useEffect(() => {
        if (skillsData.length === 0) {
            leerPersonas();
        }
    }, [skillsData]);

    // Función utilizada para leer los colores que se encuentran en la base de datos de mongoDB.
    let leerColores = async () => {

        try {
            const response = await fetch("http://192.168.55.50:9000/department/list", {
                method: "GET"
            });
            if (response.ok) {
                const data = await response.json();
                let newData = [];
                const item = data.data;
                for (let i = 0; i < item.length; i++) {
                    newData.push(item[i].color)
                }
                setColoresDepartamentos(newData) 
                setColoresTeams(newData)
                setColoresSkills(newData)

            }

        } catch (error) {
            console.log(error);
        }

    }

    // Función utilizada para leer todos los departamentos de la base de datos.
    let leerDepartament = async () => {
        try {
            const response = await fetch("http://192.168.55.50:9000/department/list", {
                method: "GET"
            });
            if (response.ok) {
                const data = await response.json();
                let newData = [];

                for (let i = 0; i < data.data.length; i++) {
                    newData.push(data.data[i]);
                }
                setDepartmentData(newData);
                setDepartmentData2(newData);
                personasDepartamentos();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Función utilizada para leer los teams de un depertamento en concreto.
    let leerTeams = async () => {
        if (departamento != "") {
            try {
                const response = await fetch("http://192.168.55.50:9000/team/list/teams?department=" + departamento, {
                    method: "GET"
                });
                if (response.ok) {
                    const data = await response.json();

                    let newData = [];

                    for (let i = 0; i < data.data.length; i++) {
                        newData.push(data.data[i]);
                    }
                    setTeamsData(newData)
                    setTeamsData2(newData)
                    personasTeams()
                }
            } catch (error) {
                console.log(error);
            }
        };
    }

    // Función utilizada para leer las skills de un departamento y un team específico.
    let leerSkills = async () => {
        if (team != "") {
            try {
                const response = await fetch("http://192.168.55.50:9000/skill/list?department=" + departamento + "&team=" + team, {
                    method: "GET"
                });
                if (response.ok) {
                    const data = await response.json();
                    let newData = [];

                    for (let i = 0; i < data.data.length; i++) {
                        newData.push(data.data[i]);
                    }
                    setSkillsData(newData)
                    setSkillsData2(newData)
                    personasSkill()
                }

            } catch (error) {
                console.log(error);
            }


        };
    }

    // Función utilizada para leer todas aquellas personas que tengan esa skill concreta.
    let leerPersonas = async () => {
        if (skill != "") {
            try {
                const response = await fetch("http://192.168.55.50:9000/user/skill/person?skill=" + skill, {
                    method: "GET"
                });
                if (response.ok) {
                    const data = await response.json();

                    // Obtener los pares clave-valor y ordenarlos por valor de mayor a menor
                    let sortedPairs = Object.entries(data.data).sort((a, b) => b[1] - a[1]);
                    // Obtener un array de solo las claves ordenadas
                    let sortedKeys = sortedPairs.map(pair => pair[0]);
                    // Obtener un array de solo los valores ordenados
                    let sortedValues = sortedPairs.map(pair => pair[1]);

                    for (let i = 0; i < sortedKeys.length; i++) {
                        if (sortedKeys[i].length >= 26) {
                            const lastSpaceIndex = sortedKeys[i].lastIndexOf(' ');
                            if (lastSpaceIndex !== -1) {
                                sortedKeys[i] = sortedKeys[i].substring(0, lastSpaceIndex) + ' ...';
                            }
                        }
                    }
                    setIndice2(sortedValues);
                    setPersonData(sortedKeys);
                    setPersonData2(sortedKeys);
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    // Funcion utilizada para saber cuantas personas tienen cada una de las skills, necesita saber a que team hace referencia.
    let personasSkill = async () => {
        try {
            const response = await fetch("http://192.168.55.50:9000/user/skill/listQuantity?team=" + team, {
                method: "GET"
            });
            if (response.ok) {
                const data = await response.json();
                let respuesta = data.data;
                const value = Object.values(respuesta);
                setCandidadPersonas(value)
            }
        } catch (error) {
            console.log(error);
        }

    }

    // Función utilizada para saber cuantas personas estan en cada uno de los teams, necesita saber a que departamento hace referencia.
    let personasTeams = async () => {
        if (departamento != "") {
            try {
                const response = await fetch("http://192.168.55.50:9000/team/listQuantity?department=" + departamento, {
                    method: "GET"
                });
                if (response.ok) {
                    const data = await response.json();
                    let respuesta = data.data;
                    const value = Object.values(respuesta);
                    setCantidadTeam(value)


                }
            } catch (error) {
                console.log(error);
            }
        };
    }

    // Función utilizada para saber las personas que hay en cada departamento, necesita pasar a que departamentos hace referencia.
    let personasDepartamentos = async () => {
        try {

            const body =
                [{ "name": "Desarrollo" }, { "name": "Sistemas" }, { "name": "Operaciones" }, { "name": "Calidad" }, { "name": "Diseño" }, { "name": "Comunicación" }, { "name": "CAU" }]
                ;

            const response = await fetch("http://192.168.55.50:9000/department/listQuantity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                const data = await response.json();
                let respuesta = data.data;
                const value = Object.values(respuesta);
                setCantidadDepartment(value)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: 360, flex: 0.95 }}>
                {teamsData.length > 0 ? (
                    <View style={styles.departamento}>
                        <TouchableOpacity onPress={() => { setDepartmentData(departmentData2), setBool(false), setTeamsData([]), setSkillsData([]), setPersonData([]), setDepartamento(""), setTeam(""), setSkill("") }}>
                            {departamento != "" ? (<Ionicons style={{ marginLeft: 5, borderRadius: 30 }} name="md-chevron-back-circle" size={32} color="black" />) : ""}
                        </TouchableOpacity>
                        <Text style={styles.name}>Departamento: </Text>
                        <Text style={[styles.name, { color: coloresDepartamentos[indice] }]}>{departamento}</Text>
                    </View>
                ) : skillsData.length > 0 ? (
                    <View>
                        <View style={styles.departamento}>
                            <TouchableOpacity onPress={() => { setDepartmentData(departmentData2), setBool(false), setTeamsData([]), setSkillsData([]), setPersonData([]), setDepartamento(""), setTeam(""), setSkill("") }}>
                                {departamento != "" ? (<Ionicons style={{ marginLeft: 5, borderRadius: 30 }} name="md-chevron-back-circle" size={32} color="black" />) : ""}
                            </TouchableOpacity>
                            <Text style={styles.name}>Departamento: </Text>
                            <Text style={[styles.name, { color: coloresDepartamentos[indice] }]}>{departamento}</Text>
                        </View>
                        <View style={styles.departamento}>
                            <TouchableOpacity onPress={() => { setSkillsData([]), setDepartmentData([]), setBool(false), setPersonData([]), setTeamsData(teamsData2) }}>
                                {team != "" ? <Ionicons style={{ marginLeft: 5 }} name="md-chevron-back-circle" size={32} color="black" /> : ""}
                            </TouchableOpacity>
                            <Text style={styles.name}>Equipo: </Text>
                            <Text style={[styles.name, { color: coloresTeams[indice] }]}>{team}</Text>
                        </View>
                    </View>
                ) : personData.length > 0 || bool == true ? (
                    <View>
                        <View style={styles.departamento}>
                            <TouchableOpacity onPress={() => { setDepartmentData(departmentData2), setTeamsData([]), setBool(false), setSkillsData([]), setPersonData([]), setDepartamento(""), setTeam(""), setSkill("") }}>
                                {departamento != "" ? (<Ionicons style={{ marginLeft: 5, borderRadius: 30 }} name="md-chevron-back-circle" size={32} color="black" />) : ""}
                            </TouchableOpacity>
                            <Text style={styles.name}>Departamento: </Text>
                            <Text style={[styles.name, { color: coloresDepartamentos[indice] }]}>{departamento}</Text>
                        </View>
                        <View style={styles.departamento}>
                            <TouchableOpacity onPress={() => { setSkillsData([]), setDepartmentData([]), setBool(false), setPersonData([]), setTeamsData(teamsData2) }}>
                                {team != "" ? <Ionicons style={{ marginLeft: 5 }} name="md-chevron-back-circle" size={32} color="black" /> : ""}
                            </TouchableOpacity>
                            <Text style={styles.name}>Equipo: </Text>
                            <Text style={[styles.name, { color: coloresTeams[indice] }]}>{team}</Text>
                        </View>
                        <View style={styles.departamento}>
                            <TouchableOpacity onPress={() => { setTeamsData([]), setDepartmentData([]), setBool(false), setPersonData([]), setSkillsData(skillsData2) }}>
                                {skill != "" ? (<Ionicons style={{ marginLeft: 5, borderRadius: 30 }} name="md-chevron-back-circle" size={32} color="black" />) : ""}
                            </TouchableOpacity>
                            <Text style={styles.name}>Habilidad: </Text>
                            <Text style={[styles.name, { color: coloresSkills[indice] }]}>{skill}</Text>
                        </View>
                    </View>
                ) : null
                }
                <View>
                    {departmentData.length > 0 ? (
                        // Muestra los departamentos
                        departmentData.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    setDepartmentData([]);
                                    setDepartamento(item.name);
                                    leerTeams();
                                    setIndice(index);
                                }}>
                                <View
                                    style={[
                                        styles.boxes,
                                        { backgroundColor: coloresDepartamentos[index] },
                                    ]}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{
                                            flex: 0.9,
                                            alignItems: 'flex-start',
                                            justifyContent: 'flex-start'
                                        }}>
                                            <Text style={styles.names}>{item.name}</Text>
                                        </View>
                                        <View style={{
                                            alignItems: 'flex-end',
                                            justifyContent: 'flex-start',
                                            flex: 0.1,
                                            marginRight: 10,
                                            flexDirection: 'row'
                                        }}>
                                            {item.name === "CAU" ? (<Ionicons style={{ flexDirection: 'row', marginBottom: 15 }} name="person" size={14} color="black" />) :
                                                (<Ionicons style={{ flexDirection: 'row', marginBottom: 15 }} name="person" size={14} color="white" />)}
                                            {item.name != "CAU" ? (<Text style={styles.team}> {cantidadDepartment[index]} </Text>) : (<Text style={styles.team2}> {cantidadDepartment[index]} </Text>)}
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        teamsData.length > 0 ? (
                            // Muestra los equipos
                            teamsData.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setTeamsData([]);
                                        setTeam(item.team);
                                    }}>
                                    <View
                                        style={[
                                            styles.boxes,
                                            { backgroundColor: coloresTeams[indice] },
                                        ]}>
                                        {item.team == 'CAU' ? (
                                            <Text
                                                style={{
                                                    color: 'black',
                                                    fontWeight: '700',
                                                    fontSize: 20,
                                                    alignItems: 'center',
                                                }}>
                                                {item.team}
                                            </Text>
                                        ) : (

                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <View style={{
                                                    flex: 0.9,
                                                    alignItems: 'flex-start',
                                                    justifyContent: 'flex-start'
                                                }}>
                                                    <Text style={styles.team}>{item.team}</Text>
                                                </View>
                                                <View style={{
                                                    alignItems: 'flex-end',
                                                    justifyContent: 'flex-start',
                                                    flex: 0.1,
                                                    marginRight: 10,
                                                    flexDirection: 'row'
                                                }}>
                                                    <Ionicons style={{ flexDirection: 'row', marginBottom: 15 }} name="person" size={14} color="white" />
                                                    <Text style={styles.team}> {cantidadTeam[index]} </Text>
                                                </View>
                                            </View>



                                        )}
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            skillsData.length > 0 ? (
                                // Muestra las habilidades
                                skillsData.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            setSkillsData([]);
                                            setSkill(item.skill);
                                            setBool(true);
                                        }}>
                                        <View
                                            style={[
                                                styles.boxes,
                                                { backgroundColor: coloresSkills[indice] },
                                            ]}>
                                            {item.team == 'CAU' ? (
                                                <Text
                                                    style={{
                                                        color: 'black',
                                                        fontWeight: '700',
                                                        fontSize: 20,
                                                        alignItems: 'center',
                                                    }}>
                                                    {item.team}
                                                </Text>
                                            ) : (
                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                    <View style={{
                                                        flex: 0.9,
                                                        alignItems: 'flex-start',
                                                        justifyContent: 'flex-start'
                                                    }}>
                                                        <Text style={styles.team}>{item.skill}</Text>
                                                    </View>
                                                    <View style={{
                                                        alignItems: 'flex-end',
                                                        justifyContent: 'flex-start',
                                                        flex: 0.1,
                                                        marginRight: 10,
                                                        flexDirection: 'row'
                                                    }}>
                                                        <Ionicons style={{ flexDirection: 'row', marginBottom: 15 }} name="person" size={14} color="white" />
                                                        <Text style={styles.team}> {candidadPersonas[index]} </Text>
                                                    </View>
                                                </View>

                                            )}
                                        </View>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                personData.map((item, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.boxes,
                                            { backgroundColor: backgroundColorMap[indice2[index]] },
                                        ]}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{
                                                flex: 0.9,
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start'
                                            }}>
                                                <Text style={styles.names}>{item}</Text>
                                            </View>
                                            <View style={{
                                                alignItems: 'flex-end',
                                                justifyContent: 'flex-start',
                                                flex: 0.1
                                            }}>
                                                {indice2[index] === 1 ? (
                                                    <View>
                                                        <MaterialCommunityIcons name="circle-slice-2" size={28} color="black" />
                                                    </View>
                                                ) : indice2[index] === 2 ? (
                                                    <View>
                                                        <MaterialCommunityIcons name="circle-slice-4" size={28} color="black" />
                                                    </View>
                                                ) : indice2[index] === 3 ? (
                                                    <View>
                                                        <MaterialCommunityIcons name="circle-slice-6" size={28} color="black" />
                                                    </View>
                                                ) : indice2[index] === 4 ? (
                                                    <View>
                                                        <MaterialCommunityIcons name="circle-slice-8" size={28} color="black" />
                                                    </View>
                                                ) : null}
                                            </View>
                                        </View>
                                    </View>
                                ))

                            )
                        )
                    )}
                </View>
            </ScrollView>
        </View>

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
        marginBottom: 10,
        borderColor: "black",
        borderWidth: 2,
        backgroundColor: "#FFDEAD",
        flexDirection: "row",
        justifyContent: 'center',
        width: 300,
        height: 50,
        marginLeft: 30,
        paddingTop: 7
    },
    names: {
        fontWeight: '700',
        fontSize: 20,

    },
    name: {
        fontWeight: '700',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginTop: 3,
        marginBottom: 10
    },
    departamento: {
        fontWeight: '700',
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 5,
        textAlign: 'center',
        borderRadius: 20,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 15,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        flexDirection: 'row',
    },
    team: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 20,
        alignItems: 'center',
        color: "white",
        marginBottom: 10,
    },
    team2: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 20,
        alignItems: 'center',
        color: "black",
        marginBottom: 10,
    },
});
