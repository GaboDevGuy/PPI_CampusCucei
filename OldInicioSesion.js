import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, TextInput, TouchableOpacity} from 'react-native';
import { WebView } from 'react-native-webview';
import { Input, password, setPassword, showPassword, Icon, toggleShowPassword } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
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
      //Variables para almacenar la informacion
      InputCodigo:"",
      InputNip:"",
      AlumnoNombre:"",
      AlumnoCarrera:"",
      AlumnoCodigo:"",
      AlumnoStatus:"",
      Valido:"loquesea",
    };
  }

  render() {

    const Acceder = () => {
        var _this = this;
        console.log("push");
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            
            //Leer respuesta del servidor
            var temp = JSON.parse(xhttp.responseText);

            //Asignar cada variable segun la respuesta del servidor
            _this.setState({
              AlumnoNombre: temp.nombre,
              AlumnoCarrera: temp.carrera,
              AlumnoCodigo: temp.codigo,
              AlumnoStatus: temp.situacion,
              Valido: xhttp.responseText
            }, () => {
              //Ejecutar irAalumno si la variable valido no da error
              if (_this.state.Valido !== "" && _this.state.Valido !== "{\"message\":\"Credenciales invalidas\"}"
              && _this.state.Valido !== "{\"error\":\"Missing codigo or password\"}")
              {
                irAalumno();//Si es valido ir a alumno para mostrar datos
              }
            });

            console.log(xhttp.responseText);

            }
        };

        //Linea que lee los datos
        xhttp.open("GET", "https://cuceimobile.space/campusCucei/auth.php?codigo="+this.state.InputCodigo+"&nip="+this.state.InputNip, true);
        xhttp.send();
    }

    const irAalumno = () =>{
      console.log("Cambiar a alumno");
        this.props.navigation.navigate("Alumno", {
          //Pasar variables a la siguiente pagina al momento de ir a alumno
          Nombre: this.state.AlumnoNombre,
          Carrera: this.state.AlumnoCarrera,
          Codigo: this.state.AlumnoCodigo,
          Status: this.state.AlumnoStatus
        });
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

        source={require("./assets/FondoDirectorio.png")}>

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

          <TouchableOpacity onPress = {Acceder}>
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
