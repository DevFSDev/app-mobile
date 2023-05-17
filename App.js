import { StyleSheet } from 'react-native';
import Pantalla8 from './Pantalla8';
import Pantalla7 from './Pantalla7';
import Pantalla6 from './Pantalla6';
import Pantalla5 from './Pantalla5';
import Pantalla4 from './Pantalla4';
import Pantalla3 from './Pantalla3';
import Pantalla2 from './Pantalla2';
import Pantalla1 from './Pantalla1';
import PantallaPrincipal from './PantallaPrincipal';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PantallasProvider } from './PantallasContext';


const Stack = createStackNavigator();

export default function App() {
  return (
    <PantallasProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Principal" component={PantallaPrincipal} />
          <Stack.Screen name="Plantilla transportes" component={Pantalla1} />
          <Stack.Screen name="Menú" component={Pantalla2} />
          <Stack.Screen name="Habilidades" component={Pantalla3} />
          <Stack.Screen name="Añadir habilidades" component={Pantalla4} />
          <Stack.Screen name="Todos los departamentos" component={Pantalla5} />
          <Stack.Screen name="Añadir varias habilidades" component={Pantalla6} />
          <Stack.Screen name="Proyectos" component={Pantalla7} />
          <Stack.Screen name="Detalle proyectos" component={Pantalla8} />
        </Stack.Navigator>
      </NavigationContainer>
    </PantallasProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});
