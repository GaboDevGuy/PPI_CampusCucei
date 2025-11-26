import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PRINCIPAL from './Principal';
import DIRECTORIO from './Directorio';
import VIDEOINSTITUCIONAL from './VideoInstitucional';
import MAPA from './Mapa';
import INICIOSESION from './InicioSesion';
import ALUMNO from './Alumno';
import MATERIAS from './Materias';
import CREDITOS from './Creditos';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Inicio" component={PRINCIPAL} options={{headerShown: false}}/>
                <Stack.Screen name="Directorio" component={DIRECTORIO} options={{headerShown: false}}/>
                <Stack.Screen name="VideoInstitucional" component={VIDEOINSTITUCIONAL} options={{headerShown: false}}/>
                <Stack.Screen name="Mapa" component={MAPA} options={{headerShown: false}}/>
                <Stack.Screen name="InicioSesion" component={INICIOSESION} options={{headerShown: false}}/>
                <Stack.Screen name="Alumno" component={ALUMNO} options={{headerShown: false}}/>
                <Stack.Screen name="Materias" component={MATERIAS} options={{headerShown: false}}/>
                <Stack.Screen name="Creditos" component={CREDITOS} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
  }
}

