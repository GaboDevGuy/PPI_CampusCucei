import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SesionActiva: 0,
    };
  }

  componentDidMount() {
    this.verificarSesion();
    
    //Actualizar cada vez que se abra la pagina
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.verificarSesion();
    });
  }

  componentWillUnmount() {
    //Remover foco cuando ya no se esta viendo la pagina
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  obtenerDatosUsuario = async () => {
    //Funcion que obtiene los datos del usuario (osea si hay sesion o no)
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString !== null) {
        const userData = JSON.parse(userDataString);
        return userData;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  verificarSesion = async () => {
    try {
      const userData = await this.obtenerDatosUsuario();
      
      if (userData !== null)
      {
        //Sesion encontrada
        this.setState({ SesionActiva: 1 });
      }
      else
      {
        //No hay sesion
        this.setState({ SesionActiva: 0 });
      }
      
    } catch (error) {
      // En caso de error, considerar sesión inactiva
      this.setState({ SesionActiva: 0 });
    }
  }

  irADirectorio = () => {
    console.log("Ir a directiorio");
    this.props.navigation.navigate("Directorio")
  }

  irAVideoInstitucional = () => {
    console.log("Ir a Video");
    this.props.navigation.navigate("VideoInstitucional")
  }

  irAMapa = () => {
    console.log("Ir a Mapa");
    this.props.navigation.navigate("Mapa")
  }

  irAInicioSesion = async () => {
    if (this.state.SesionActiva == 0)
    {
      console.log("Ir a Inicio de sesion");
      this.props.navigation.navigate("InicioSesion");
    }
    else
    {
      console.log("Ir a perfil del alumno");
      this.props.navigation.navigate("Alumno");
    }
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: "#000D56",
      }}>

        <ImageBackground style={{
          flex: 1,
          width: '100%',
          height: '100%',
          resizeMode: 'cover'
        }}

          source={require("./assets/Fondos/Fondo_Principal.png")}>


            <View style={{//Posicion de boton Directorio
            position: 'absolute',
            top: "8%",
            left: "22%",
            height: 87,
            width: 228,
            justifyContent: 'center',
            
          }}>

            <Text style={{
                top: -5,
                fontSize: 35,
                textAlign: "center",
                color: "white",
              }}>Bienvenido</Text>

            
              <Image style={{
                width: "100%",
                height: "100%",
              }}

                source={require("./assets/Cucei_Logos/Logo_Cucei.png")}

              ></Image>
          </View>

          <View style={{//Posicion de Inicio de sesion 
            position: 'absolute',
            top: "24%",
            right: "4%",
            height: 25,
            width: 200,
          }}>
            
            <TouchableOpacity onPress={this.irAInicioSesion}>
              <Image style={{
                width: "100%",
                height: "100%",
              }}

                source={require("./assets/Iconos/Icono_InicioSesion.png")}

              ></Image>
              
              <Text style={{
                left: 60,
                top: -45,
                fontSize: 30,
                textAlign: "left",
                color: "white",
                
              }}>
                {this.state.SesionActiva === 0 && "Acceder"}
                {this.state.SesionActiva === 1 && "Perfil"}
              </Text>

            </TouchableOpacity>
          </View>
          
          <View style={{//Posicion de boton Directorio
            position: 'absolute',
            top: "32%",
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
              }}>Directorio</Text>

            <TouchableOpacity onPress={this.irADirectorio}>
              <Image style={{
                width: "100%",
                height: "100%",
              }}

                source={require("./assets/Iconos/Icono_Directorio.png")}

              ></Image>

            </TouchableOpacity>
          </View>

          <View style={{//Posicion de boton Video
            position: 'absolute',
            top: "31%",
            left: "55%",
            height: 120,
            width: 120,
            justifyContent: 'center',
            
          }}>

            <Text style={{
                top: 170,
                fontSize: 21,
                textAlign: "center",
                color: "white",
              }}>Video{"\n"}Institucional</Text>

            <TouchableOpacity onPress={this.irAVideoInstitucional}>
              <Image style={{
                width: "100%",
                height: "100%",
              }}

                source={require("./assets/Iconos/Icono_Video.png")}

              ></Image>

            </TouchableOpacity>
          </View>

          <View style={{//Posicion de boton mapa
            position: 'absolute',
            top: "54%",
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
              }}>Mapa</Text>

            <TouchableOpacity onPress={this.irAMapa}>
              <Image style={{
                width: "100%",
                height: "100%",
              }}

                source={require("./assets/Iconos/Icono_Mapa.png")}

              ></Image>

            </TouchableOpacity>
          </View>
          

        </ImageBackground>
      </View>
    );
  }
}