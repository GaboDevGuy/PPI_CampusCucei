import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';

/*
https://cuceimobile.space/campusCucei/auth.php?codigo=CODIGO&nip=NIP

Si es incorrecto (https://cuceimobile.space/campusCucei/auth.php?codigo=216746231&nip=CONTRASE%C3%91A)
{"message":"Credenciales invalidas"}

Si no se ingresa nada (https://cuceimobile.space/campusCucei/auth.php?codigo=&nip=)
{"error":"Missing codigo or password"}

Si es correcto
{"carrera":"ICOM","nombre":"FERNANDO GABRIEL GODINEZ HERNANDEZ","codigo":"216746231","ciclo":"2025-B","campus":"CUCEI","situacion":"AC"}

https://reactnativeelements.com/
*/

export default class Directorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
    await this.verificarSesionActiva();
  }
  
  guardarDatosUsuario = async (userData) => {
    try {
      //Guardar JSON en archivo
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      console.log('Datos guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar datos: ', error);
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

  //Funcion que arregla el merequetenge del server (NO es mia)
  parseServerResponse = (responseText) => {
    try {
      
      // Si es un error conocido, retornar null
      if (responseText === "{\"message\":\"Credenciales invalidas\"}" || 
          responseText === "{\"error\":\"Missing codigo or password\"}") {
        return null;
      }

      // Intentar detectar si hay múltiples objetos JSON
      if (responseText.includes('}{')) {
        //Este es el bug del JSON
        const separatorIndex = responseText.indexOf('}{') + 1;
        const firstPart = responseText.substring(0, separatorIndex);
        const secondPart = responseText.substring(separatorIndex);
        
        const basicInfo = JSON.parse(firstPart);
        const academicInfo = JSON.parse(secondPart);
        
        // Combinar ambos objetos
        return {
          ...basicInfo,
          ...academicInfo
        };
      } else {
        // Es un solo objeto JSON
        return JSON.parse(responseText);
      }
    } catch (error) {
      
      return null;
    }
  }

  Acceder = () => {
    var _this = this;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200)
      {
        console.log(xhttp.responseText);

        //Utilizar parse 'especial'
        const parsedData = _this.parseServerResponse(xhttp.responseText);

        if (parsedData)
        {
          //Los datos son validos
          _this.setState({Valido: "success"}, async () => {
          
          //Guardar los datos
          await _this.guardarDatosUsuario(parsedData);

          //Regresar a la pagina anterior (se inicio correctamente)
          _this.irAalumno(parsedData);
          });
        }
        else
        {
          // Credenciales invalidas, se almacena para los textos de error
          _this.setState({Valido: xhttp.responseText});
        }
      }
    };

    xhttp.open("GET", "https://cuceimobile.space/campusCucei/auth.php?codigo="+this.state.InputCodigo+"&nip="+this.state.InputNip, true);
    xhttp.send();
  }

  irAalumno = (userData = null) => {
    console.log("Sesion Iniciada correctamente");
    /*
    // Usar los datos pasados como parámetro o del estado
    const userInfo = userData || {
      nombre: this.state.AlumnoNombre,
      carrera: this.state.AlumnoCarrera,
      codigo: this.state.AlumnoCodigo,
      situacion: this.state.AlumnoStatus
    };

    this.props.navigation.navigate("Alumno", {
      // Pasar todas las variables necesarias
      Nombre: userInfo.nombre,
      Carrera: userInfo.carrera,
      Codigo: userInfo.codigo,
      Status: userInfo.situacion,
      // Pasar el objeto completo por si necesitas más datos
      UserData: userData
    });*/
    this.props.navigation.goBack();
  }
 

  render() {
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

        source={require("./assets/FondoDirectorio.png")}>

        {/*Este codigo es una base*/}

        </ImageBackground>
      </View>
    );
  }
}
