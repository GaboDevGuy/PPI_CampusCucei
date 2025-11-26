import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default class Directorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      materias: []
    };
  }

  async componentDidMount() {
    await this.verificarSesionActiva();
  }

  verificarSesionActiva = async () => {
    try {
      const userData = await this.obtenerDatosUsuario();
      if (userData) {
        //Cargar los datos inmediatamente
        this.setState({
          UserData: userData,
          materias: userData.materias || []
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      return false;
    }
  }
  
  obtenerDatosUsuario = async () => {
    try {
      //Cargar datos del usuario
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString !== null) {
        const userData = JSON.parse(userDataString);
        //console.log('Datos recuperados: ', userData);
        console.log('Datos recuperados: ');
        return userData;
      }
      return null;
    } catch (error) {
      console.error('Error recuperando datos: ', error);
      return null;
    }
  }

  // Componente para renderizar cada item de la materia (Gracias miguel)
  renderMateriaItem = ({ item }) => (
  <ImageBackground
    source={require('./assets/Iconos/Icono_Base_Azul.png')}
    imageStyle={{ borderRadius: 10 }} // respeta el borde redondeado
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      borderColor: 'transparent',
      borderWidth: 3,
      marginVertical: 5,
      borderRadius: 10,
      overflow: 'hidden', // asegura que la imagen se recorte al borde
    }}
    resizeMode="cover" // la imagen cubre todo el fondo
  >
    <View style={{ flex: 1, marginRight: 10 }}>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
      }}>
        {item.descripcion}
      </Text>

      <Text style={{
        fontSize: 12,
        color: 'white',
      }}>
        {item.clave} • {item.ciclo} • {item.creditos} créditos
      </Text>
    </View>

    <View style={{
      backgroundColor: 'white',
      borderRadius: 15,
      borderColor: 'transparent',
      borderWidth: 3,
      paddingHorizontal: 12,
      paddingVertical: 6,
      minWidth: 50,
      alignItems: 'center',
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
      }}>
        {this.extraerNumeroCalificacion(item.calificacion)}
      </Text>
    </View>
  </ImageBackground>
);

  // Función para extraer solo el número de la calificación
  extraerNumeroCalificacion = (calificacion) => {
    const match = calificacion.match(/(\d+)/);
    return match ? match[1] : calificacion;
  }

  render() {

    const TerminarSesion = async () => {
        await this.cerrarSesion();
        this.props.navigation.goBack();
    }
    
    return (
      <View style = {{
        flex: 1,
        backgroundColor : "#1E0056",
        }}>
        
        <ImageBackground style = {{
          flex : 1,
          width : '100%',
          height : '100%',
          resizeMode : 'cover',
        }}

        source={require("./assets/Fondos/Fondo_Alumno.png")}>

        <Text style={{
          fontSize:30,
          textAlign:"center",
          marginTop:"10%",
          color:"white"
        }}>Materias</Text>

        {/* Mostrar lista de materias */}
        <View style={{
          flex: 1,
          marginHorizontal: 20,
          marginTop: 20,
          marginBottom: 20,
        }}>
          <FlatList
            data={this.state.materias}
            renderItem={this.renderMateriaItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
          />
        </View>

        </ImageBackground>
      </View>
    );
  }
}