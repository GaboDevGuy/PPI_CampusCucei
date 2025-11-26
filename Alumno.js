import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, TextInput, TouchableOpacity} from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default class Directorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Variables de los datos del alumno
      Nombre:"Name",
      Carrera:"Carrera ee",
      Codigo:"Numero",
      Status:"State",
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
          Nombre: userData.nombre,
          Carrera: userData.carrera,
          Codigo: userData.codigo,
          Status: userData.situacion
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

  cerrarSesion = async () => {
    try {
      //Borrar datos
      await AsyncStorage.removeItem('userData');
      console.log('Sesión cerrada exitosamente');
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  }

  render() {

    const TerminarSesion = async () => {
        await this.cerrarSesion();
        this.props.navigation.goBack();
    }

    const irAMaterias = () =>{
        console.log("Ir a materias");
        this.props.navigation.navigate("Materias")
    }

    const irACreditos = () =>{
        console.log("Ir a creditos");
        this.props.navigation.navigate("Creditos")
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
        }}>Alumno</Text>

        <View style={{
            position: 'absolute',
            top: "12.5%",
            left: "26%",
            borderColor : "transparent",
            borderWidth : 4,
            width : 200,
            height : 50,
            borderRadius : 20,
        }}>
            <Text style={{
              fontSize : 30,
              color:"white",
              textAlign:"center",
            }}>Nombre</Text>
        </View>

        <View style={{
            position: 'absolute',
            top: "18%",
            left: "6%",
            borderColor : "#5c5c5cff",
            borderWidth : 4,
            width : 350,
            height : 75,
            borderRadius : 20,
            backgroundColor : "white",
        }}>
            <Text style={{
              fontSize : 26,
              color:"black",
              textAlign:"center",
            }}>{this.state.Nombre}</Text>
        </View>
        
        <View style={{
            position: 'absolute',
            top: "27%",
            left: "6%",
            borderColor : "transparent",
            borderWidth : 4,
            width : 200,
            height : 50,
            borderRadius : 20,
        }}>
            <Text style={{
              fontSize : 30,
              color:"white",
              textAlign:"center",
            }}>Codigo</Text>
        </View>

        <View style={{
            position: 'absolute',
            top: "32.5%",
            left: "6%",
            borderColor : "#5c5c5cff",
            borderWidth : 4,
            width : 200,
            height : 45,
            borderRadius : 20,
            backgroundColor : "white",
        }}>
            <Text style={{
              fontSize : 26,
              color:"black",
              textAlign:"center",
            }}>{this.state.Codigo}</Text>
        </View>

        <View style={{
            position: 'absolute',
            top: "27%",
            right: "6%",
            borderColor : "transparent",
            borderWidth : 4,
            width : 130,
            height : 50,
            borderRadius : 20,
        }}>
            <Text style={{
              fontSize : 30,
              color:"white",
              textAlign:"center",
            }}>Carrera</Text>
        </View>

        <View style={{
            position: 'absolute',
            top: "32.5%",
            right: "6%",
            borderColor : "#5c5c5cff",
            backgroundColor : "white",
            borderWidth : 4,
            width : 130,
            height : 45,
            borderRadius : 20,
        }}>
            <Text style={{
              fontSize : 26,
              color:"black",
              textAlign:"center",
            }}>{this.state.Carrera}</Text>
        </View>

        <View style={{
            position: 'absolute',
            top: "40%",
            left: "6%",
            borderColor : "transparent",
            borderWidth : 4,
            width : 130,
            height : 50,
            borderRadius : 20,
        }}>
            <Text style={{
              fontSize : 30,
              color:"white",
              textAlign:"center",
            }}>Estado</Text>
        </View>

        <View style={{
            position: 'absolute',
            top: "40%",
            left: "40%",
            borderColor : "#5c5c5cff",
            borderWidth : 4,
            width : 70,
            height : 50,
            borderRadius : 20,
            backgroundColor : "white",
        }}>
            <Text style={{
              fontSize : 30,
              color:"black",
              textAlign:"center",
            }}>{this.state.Status}</Text>
        </View>

        <View style={{
            position: 'absolute',
            top: "46%",
            left: "15%",
            height: 120,
            width: 120,
            justifyContent: 'center',
          }}>

          <Text style={{
              top: 150,
              fontSize: 25,
              textAlign: "center",
              color: "white",
            }}>Creditos</Text>

          <TouchableOpacity onPress={irACreditos}>
            <Image style={{
              width: "100%",
              height: "100%",
            }}

              source={require("./assets/Iconos/Icono_Creditos.png")}

            ></Image>

          </TouchableOpacity>
        </View>

        <View style={{
            position: 'absolute',
            top: "46%",
            left: "55%",
            height: 120,
            width: 120,
            justifyContent: 'center',
            
          }}>

          <Text style={{
              top: 150,
              fontSize: 25,
              textAlign: "center",
              color: "white",
            }}>Materias</Text>

          <TouchableOpacity onPress={irAMaterias}>
            <Image style={{
              width: "100%",
              height: "100%",
            }}

              source={require("./assets/Iconos/Icono_Calificaciones.png")}

            ></Image>

          </TouchableOpacity>
        </View>

        <View style={{
          position: 'absolute',
          top: "70%",
          right: "12%",
          height: 25,
          width: 300,
        }}>
          
          <TouchableOpacity onPress={TerminarSesion}>
            <Image style={{
              width: "100%",
              height: "100%",
            }}

              source={require("./assets/Iconos/Icono_CerrarSesion.png")}

            ></Image>
            
            <Text style={{
              left: 60,
              top: -45,
              fontSize: 30,
              textAlign: "left",
              color: "white",
              
            }}>
              Cerrar Sesion
            </Text>

          </TouchableOpacity>
        </View>

        </ImageBackground>
      </View>
    );
  }
}
