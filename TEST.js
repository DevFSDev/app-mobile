import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import PantallasContext from './PantallasContext';

export default function Pantalla7({ navigation }) {
    const [teamsData, setTeamsData] = useState([]);
    const { departamento, setDepartamento } = useContext(PantallasContext);

    useEffect(() => {
        leerTeams();
    }, []);


    let leerTeams = async () => {
        try {
            const response = await fetch("http://192.168.85.50:9000/team/list/teams?department=" + departamento, {
                method: "GET"
            });
            if (response.ok) {
                console.log("Recibiendo datos")
                const data = await response.json();
                let newData = [];

                for (let i = 0; i < data.data.length; i++) {
                    newData.push(data.data[i]);
                }
                setTeamsData(newData)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: 360 }}>
                <View>
                    {teamsData.length > 0 ? (
                        teamsData.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => { }}>
                                <View style={styles.boxes}>
                                    <Text style={styles.team}>{item.team}</Text>
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
        justifyContent: 'center',
        width: 300,
        height: 50,
        marginLeft: 30,
        paddingTop: 7
    },
    team: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 20,
        alignItems: 'center'
    },

});
