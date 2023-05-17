import { StyleSheet, Text, View, TextInput, ScrollView, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function PantallaPrincipal({ navigation }) {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.navigate("Plantilla transportes") }} style={{ backgroundColor: '#B0C4DE', padding: 20, borderRadius: 5, marginBottom: 10, marginTop: 20, width: 300, alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>Plantilla</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate("Todos los departamentos") }} style={{ backgroundColor: '#ADD8E6', padding: 20, borderRadius: 5, marginBottom: 10, marginTop: 20, width: 300, alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>Todos los departamentos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate("Proyectos") }} style={{ backgroundColor: '#87CEEB', padding: 20, borderRadius: 5, marginBottom: 10, marginTop: 20, width: 300, alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>Proyectos</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
