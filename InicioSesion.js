import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Input, password, setPassword, showPassword, Icon, toggleShowPassword } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default class Directorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      InputCodigo:"",
      InputNip:"",
      Valido:"loquesea",
    };
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

  /*
  Acceder = () => {
    var _this = this;

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200)
      {
        //console.log(xhttp.responseText);

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
  }*/

  Acceder = async () => {
    try
    {
      const response = await fetch("https://cuceimobile.space/campusCucei/auth.php?codigo="+this.state.InputCodigo+"&nip="+this.state.InputNip);
      
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseText = await response.text();
      console.log(responseText);

      //Utilizar parse 'especial'
      const parsedData = this.parseServerResponse(responseText);

      if (parsedData)
      {
        //Los datos son validos
        this.setState({ Valido: "success" }, async () => {
          //Guardar los datos
          await this.guardarDatosUsuario(parsedData);

          //Regresar a la pagina anterior (se inicio correctamente)
          this.irAalumno(parsedData);
        });
      }
      else
      {
        //Credenciales invalidas, se almacena para los textos de error
        this.setState({ Valido: responseText });
      }
      
    }
    catch (error)
    {
      console.error('Error en la petición:', error);
      // Manejar errores de red o del servidor
      this.setState({ Valido: "error" });
    }
  }

  irAalumno = (userData = null) => {
    console.log("Sesion Iniciada correctamente");

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
      
              source={require("./assets/Fondos/Fondo_Alumno.png")}>
      
              <View style = {{
                  marginTop : 50,
                  marginLeft : 60,
              }}>
                  <Image style = {{
                      width : 275,
                      height : 140,
                  }}
      
                  source={require("./assets/Udg_Logo.png")}
      
                  ></Image>
              </View>
      
              <Text style={{
                  //Mostrar Titulo
                  fontSize : 40,
                  color : "white",
                  textAlign : "center",
              }}>Iniciar Sesion</Text>
      
              <View style={{
                  //Caja de texto codigo
                  borderColor : "#5c5c5cff",
                  borderWidth : 3,
                  width : 250,
                  height : 60,
                  marginLeft : 70,
                  marginTop : 30,
                  borderRadius : 10,
                  backgroundColor : "white",
              }}>
                  <TextInput style = {{
                      fontSize : 25,
                      color : "black",
                      
                      }}
                      placeholder="Codigo"
                      placeholderTextColor="#c4c4c4ff"
                      onChangeText={InputCodigo => this.setState({InputCodigo})}
                      //Termina Caja de texto codigo
                      ></TextInput>
              </View>
      
              <Input
                //Caja de texto Nip
                placeholder="NIP"
                placeholderTextColor="#c4c4c4ff"
                secureTextEntry={true}
                inputStyle={{
                  fontSize: 25,
                  color: "black",
                }}
                inputContainerStyle={{
                  borderColor : "#5c5c5cff",
                  borderWidth : 3,
                  width : 250,
                  height : 60,
                  marginLeft : -10,
                  marginTop : -10,
                  borderRadius : 10,
                  backgroundColor : "white",
                }}
                containerStyle={{
                  width: 250,
                  marginLeft: 70,
                  marginTop: 30,
                }}
                onChangeText={InputNip => this.setState({InputNip})}
                //Termina caja de texto NIP
              />
          
              <View style = {{//Boton para Ingresar
                  height:"10%",
                  width:"64%",
                  marginLeft:"18%",
                }}>
      
                <TouchableOpacity onPress = {this.Acceder}>
                  <Image style = {{
                    width : "100%",
                    height : "100%",
                    borderRadius : 10,
                  }}
      
                  source={require("./assets/BotonPrincipal.png")}
      
                  ></Image>
                  <Text style = {{
                    marginTop : "-25%",
                    fontSize : 35,
                    textAlign : "center",
                    color : "white",
                    //Termina boton para ingresar
                  }}>Ingresar</Text>
                </TouchableOpacity>
              </View>
      
              {/*En caso de que la variable valido detecte un error mostrar el mensaje segun que pasa*/}
              {this.state.Valido === "" || this.state.Valido === "{\"message\":\"Credenciales invalidas\"}"
              || this.state.Valido === "{\"error\":\"Missing codigo or password\"}" ? (
                <View>
                  <Text style={{
                    //marginTop : "-25%",
                    fontSize: 35,
                    textAlign: "center",
                    color: "white",
                  }}>
                    {/*Mensajes de error segun el caso*/}
                    {this.state.Valido === "" && "Ingrese datos"}
                    {this.state.Valido === "{\"message\":\"Credenciales invalidas\"}" && "Credenciales invalidas"}
                    {this.state.Valido === "{\"error\":\"Missing codigo or password\"}" && "Codigo y contraseña no validos"}
                    
                    </Text>
                </View>
              ) : null}
      
              </ImageBackground>
            </View>
      
            
    );
  }
}