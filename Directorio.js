import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';

export default class Directorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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

        source={require("./assets/Fondos/Fondo_Directorio.png")}>

        <Text style={{
          fontSize:30,
          textAlign:"center",
          marginTop:"10%",
          color:"white"
        }}>Directorio</Text>

        <WebView source={{ uri: 'https://cuceimobile.space/directorio.html' }}
        style={{
          marginLeft : "5%",
          marginTop : "3%",
          width : "90%",
          height : "80%",
          maxWidth:"90%",
          maxHeight:"90%",
          //flex : 1,
          //backgroundColor: 'transparent',
          }} />

        </ImageBackground>
      </View>
    );
  }
}
