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

        source={require("./assets/Fondos/Fondo_VideoInsitucional.png")}>

        <Text style={{
          fontSize:30,
          textAlign:"center",
          marginTop:"10%",
          color:"white"
        }}>Video Institucional</Text>

        <WebView source={{ uri: 'https://earnest-treacle-f8e589.netlify.app/' }}
        style={{
          //https://app.netlify.com/drop
          marginLeft : "8%",
          marginTop : "10%",
          maxWidth:"86%",
          maxHeight:"25%",
          //flex : 1,
          backgroundColor: 'transparent',
          }} />

        </ImageBackground>
      </View>
    );
  }
}
