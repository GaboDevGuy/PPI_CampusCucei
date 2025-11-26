import React, { Component } from 'react';
import {View, Text, ImageBackground, ScrollView, TouchableOpacity, Modal, StyleSheet, Dimensions, Image} from 'react-native';

export default class Directorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      num1: null,
      NumImagen: 0
    };
    
    //Datos de las ubicaciones
    this.locations = [
  {
    id: 1,
    buttonName: "A",
    moduleName: "Modulo A",
    x: 870,
    y: 280,
    description: "• Aulas Jobs - Primer Patio\n• Control escolar - Segundo Patio\n• Consejo escolar",
    images: [
      require("./assets/CuceiImagenes/Modulo_A1.jpg"),
      require("./assets/CuceiImagenes/Modulo_A2.jpg"),
      require("./assets/CuceiImagenes/Modulo_A3.jpg"),
      require("./assets/CuceiImagenes/Modulo_A4.jpg"),
    ]
  },
  {
    id: 2,
    buttonName: "B",
    moduleName: "Modulo B",
    x: 850,
    y: 215,
    description: "• Aulas especializadas en danza y cultura",
    images: [
      require("./assets/CuceiImagenes/Modulo_B1.jpg"),
      require("./assets/CuceiImagenes/Modulo_B2.jpg"),
      require("./assets/CuceiImagenes/Modulo_B3.jpg"),
      require("./assets/CuceiImagenes/Modulo_B4.jpg"),
    ]
  },
  {
    id: 3,
    buttonName: "C",
    moduleName: "Modulo C",
    x: 820,
    y: 210,
    description: "• Aulas para internos en Jobs",
    images: [
      require("./assets/CuceiImagenes/Modulo_C1.jpg"),
      require("./assets/CuceiImagenes/Modulo_C2.jpg"),
      require("./assets/CuceiImagenes/Modulo_C3.jpg"),
      require("./assets/CuceiImagenes/Modulo_C4.jpg"),
    ]
  },
  {
    id: 4,
    buttonName: "D",
    moduleName: "Modulo D",
    x: 780,
    y: 220,
    description: "Aulas para alumnos de quimica",
    images: [
      require("./assets/CuceiImagenes/Modulo_D1.jpg"),
      require("./assets/CuceiImagenes/Modulo_D2.jpg"),
      require("./assets/CuceiImagenes/Modulo_D3.jpg"),
      require("./assets/CuceiImagenes/Modulo_D4.jpg"),
    ]
  },
  {
    id: 5,
    buttonName: "E",
    moduleName: "Modulo E",
    x: 560,
    y: 240,
    description: "Aulas para alumnos de biomedica y quimica",
    images: [
      require("./assets/CuceiImagenes/Modulo_E1.jpg"),
      require("./assets/CuceiImagenes/Modulo_E2.jpg"),
      require("./assets/CuceiImagenes/Modulo_E3.jpg"),
      require("./assets/CuceiImagenes/Modulo_E4.jpg"),
    ]
  },
  {
    id: 6,
    buttonName: "F",
    moduleName: "Modulo F",
    x: 520,
    y: 235,
    description: "Aulas para alumnos de biomedica y quimica",
    images: [
      require("./assets/CuceiImagenes/Modulo_F1.jpg"),
      require("./assets/CuceiImagenes/Modulo_F2.jpg"),
      require("./assets/CuceiImagenes/Modulo_F3.jpg"),
      require("./assets/CuceiImagenes/Modulo_F4.jpg"),
    ]
  },
  {
    id: 7,
    buttonName: "G",
    moduleName: "Modulo G",
    x: 425,
    y: 340,
    description: "Laboratorios especializados en estudiantes de quimica",
    images: [
      require("./assets/CuceiImagenes/Modulo_G1.jpg"),
      require("./assets/CuceiImagenes/Modulo_G2.jpg"),
      require("./assets/CuceiImagenes/Modulo_G3.jpg"),
      require("./assets/CuceiImagenes/Modulo_G4.jpg"),
    ]
  },
  {
    id: 8,
    buttonName: "H",
    moduleName: "Modulo H",
    x: 460,
    y: 260,
    description: "Laboratorios especializados en mujeres",
    images: [
      require("./assets/CuceiImagenes/Modulo_H1.jpg"),
      require("./assets/CuceiImagenes/Modulo_H2.jpg"),
      require("./assets/CuceiImagenes/Modulo_H3.jpg"),
      require("./assets/CuceiImagenes/Modulo_H4.jpg"),
    ]
  },
  {
    id: 9,
    buttonName: "I",
    moduleName: "Modulo I",
    x: 510,
    y: 200,
    description: "Aulas para materias varias",
    images: [
      require("./assets/CuceiImagenes/Modulo_I1.jpg"),
      require("./assets/CuceiImagenes/Modulo_I2.jpg"),
      require("./assets/CuceiImagenes/Modulo_I3.jpg"),
      require("./assets/CuceiImagenes/Modulo_I4.jpg"),
    ]
  },
  {
    id: 10,
    buttonName: "J",
    moduleName: "Modulo J",
    x: 455,
    y: 235,
    description: "Unica aula existente al parecer?",
    images: [
      require("./assets/CuceiImagenes/Modulo_J1.jpg"),
      require("./assets/CuceiImagenes/Modulo_J2.jpg"),
      require("./assets/CuceiImagenes/Modulo_J3.jpg"),
      require("./assets/CuceiImagenes/Modulo_J4.jpg"),
    ]
  },
  {
    id: 11,
    buttonName: "K",
    moduleName: "Modulo K",
    x: 435,
    y: 225,
    description: "Aulas para biomedicos",
    images: [
      require("./assets/CuceiImagenes/Modulo_K1.jpg"),
      require("./assets/CuceiImagenes/Modulo_K2.jpg"),
      require("./assets/CuceiImagenes/Modulo_K3.jpg"),
      require("./assets/CuceiImagenes/Modulo_K4.jpg"),
    ]
  },
  {
    id: 12,
    buttonName: "L",
    moduleName: "Modulo L",
    x: 455,
    y: 170,
    description: "• Laboratorios para industriales\n• Coordinaciond e ciencias basicas",
    images: [
      require("./assets/CuceiImagenes/Modulo_L1.jpg"),
      require("./assets/CuceiImagenes/Modulo_L2.jpg"),
      require("./assets/CuceiImagenes/Modulo_L3.jpg"),
      require("./assets/CuceiImagenes/Modulo_L4.jpg"),
    ]
  },
  {
    id: 13,
    buttonName: "M",
    moduleName: "Modulo M",
    x: 380,
    y: 250,
    description: "• Area para estudiantes\n• Oficinas de profesores",
    images: [
      require("./assets/CuceiImagenes/Modulo_M1.jpg"),
      require("./assets/CuceiImagenes/Modulo_M2.jpg"),
      require("./assets/CuceiImagenes/Modulo_M3.jpg"),
      require("./assets/CuceiImagenes/Modulo_M4.jpg"),
    ]
  },
  {
    id: 14,
    buttonName: "N",
    moduleName: "Modulo N",
    x: 365,
    y: 230,
    description: "• Laboratorio de electronica\n• Aulas para la creatividad",
    images: [
      require("./assets/CuceiImagenes/Modulo_N1.jpg"),
      require("./assets/CuceiImagenes/Modulo_N2.jpg"),
      require("./assets/CuceiImagenes/Modulo_N3.jpg"),
      require("./assets/CuceiImagenes/Modulo_N4.jpg"),
    ]
  },
  {
    id: 15,
    buttonName: "O",
    moduleName: "Modulo O",
    x: 325,
    y: 235,
    description: "• Coordinacion de varias carreras\n• Electronica\n• Computacion\n• Informatica\n• Etc",
    images: [
      require("./assets/CuceiImagenes/Modulo_O1.jpg"),
      require("./assets/CuceiImagenes/Modulo_O2.jpg"),
      require("./assets/CuceiImagenes/Modulo_O3.jpg"),
      require("./assets/CuceiImagenes/Modulo_O4.jpg"),
    ]
  },
  {
    id: 16,
    buttonName: "P",
    moduleName: "Modulo P",
    x: 390,
    y: 165,
    description: "Aulas para estudiantes de industriales y civiles",
    images: [
      require("./assets/CuceiImagenes/Modulo_P1.jpg"),
      require("./assets/CuceiImagenes/Modulo_P2.jpg"),
      require("./assets/CuceiImagenes/Modulo_P3.jpg"),
      require("./assets/CuceiImagenes/Modulo_P4.jpg"),
    ]
  },
  {
    id: 17,
    buttonName: "Q",
    moduleName: "Modulo Q",
    x: 395,
    y: 132,
    description: "• Aulas para materias mixtas\n• Matematicas\n• Optativas\n• Etc",
    images: [
      require("./assets/CuceiImagenes/Modulo_Q1.jpg"),
      require("./assets/CuceiImagenes/Modulo_Q2.jpg"),
      require("./assets/CuceiImagenes/Modulo_Q3.jpg"),
      require("./assets/CuceiImagenes/Modulo_Q4.jpg"),
    ]
  },
  {
    id: 18,
    buttonName: "R",
    moduleName: "Modulo R",
    x: 355,
    y: 170,
    description: "Laboratorios de computo y electronica",
    images: [
      require("./assets/CuceiImagenes/Modulo_R1.jpg"),
      require("./assets/CuceiImagenes/Modulo_R2.jpg"),
      require("./assets/CuceiImagenes/Modulo_R3.jpg"),
      require("./assets/CuceiImagenes/Modulo_R4.jpg"),
    ]
  },
  {
    id: 19,
    buttonName: "S",
    moduleName: "Modulo S",
    x: 295,
    y: 225,
    description: "Laboratorios de industriales",
    images: [
      require("./assets/CuceiImagenes/Modulo_S1.jpg"),
      require("./assets/CuceiImagenes/Modulo_S2.jpg"),
      require("./assets/CuceiImagenes/Modulo_S3.jpg"),
      require("./assets/CuceiImagenes/Modulo_S4.jpg"),
    ]
  },
  {
    id: 20,
    buttonName: "T",
    moduleName: "Modulo T",
    x: 338,
    y: 150,
    description: "Aulas para varias carreras",
    images: [
      require("./assets/CuceiImagenes/Modulo_T1.jpg"),
      require("./assets/CuceiImagenes/Modulo_T2.jpg"),
      require("./assets/CuceiImagenes/Modulo_T3.jpg"),
      require("./assets/CuceiImagenes/Modulo_T4.jpg"),
    ]
  },
  {
    id: 21,
    buttonName: "U",
    moduleName: "Modulo U",
    x: 316,
    y: 145,
    description: "Aulas para varias carreras",
    images: [
      require("./assets/CuceiImagenes/Modulo_U1.jpg"),
      require("./assets/CuceiImagenes/Modulo_U2.jpg"),
      require("./assets/CuceiImagenes/Modulo_U3.jpg"),
      require("./assets/CuceiImagenes/Modulo_U4.jpg"),
    ]
  },
  {
    id: 22,
    buttonName: "V",
    moduleName: "Modulo V",
    x: 225,
    y: 180,
    description: "Aulas para materias de matematicas",
    images: [
      require("./assets/CuceiImagenes/Modulo_V1.jpg"),
      require("./assets/CuceiImagenes/Modulo_V2.jpg"),
      require("./assets/CuceiImagenes/Modulo_V3.jpg"),
      require("./assets/CuceiImagenes/Modulo_V4.jpg"),
    ]
  },
  {
    id: 23,
    buttonName: "W",
    moduleName: "Modulo W",
    x: 185,
    y: 260,
    description: "Aulas para materias de fisica",
    images: [
      require("./assets/CuceiImagenes/Modulo_W1.jpg"),
      require("./assets/CuceiImagenes/Modulo_W2.jpg"),
      require("./assets/CuceiImagenes/Modulo_W3.jpg"),
      require("./assets/CuceiImagenes/Modulo_W4.jpg"),
    ]
  },
  {
    id: 24,
    buttonName: "X",
    moduleName: "Modulo X",
    x: 160,
    y: 255,
    description: "Aulas para materias de programacion",
    images: [
      require("./assets/CuceiImagenes/Modulo_X1.jpg"),
      require("./assets/CuceiImagenes/Modulo_X2.jpg"),
      require("./assets/CuceiImagenes/Modulo_X3.jpg"),
      require("./assets/CuceiImagenes/Modulo_X4.jpg"),
    ]
  },
  {
    id: 25,
    buttonName: "Y",
    moduleName: "Modulo Y",
    x: 240,
    y: 300,
    description: "Conocido como el Waltmart, son laboratorios para biomedica",
    images: [
      require("./assets/CuceiImagenes/Modulo_Y1.jpg"),
      require("./assets/CuceiImagenes/Modulo_Y2.jpg"),
      require("./assets/CuceiImagenes/Modulo_Y3.jpg"),
      require("./assets/CuceiImagenes/Modulo_Y4.jpg"),
    ]
  },
  {
    id: 26,
    buttonName: "Z",
    moduleName: "Modulo Z",
    x: 215,
    y: 340,
    description: "Aulas para varias materias",
    images: [
      require("./assets/CuceiImagenes/Modulo_Z1.jpg"),
      require("./assets/CuceiImagenes/Modulo_Z2.jpg"),
      require("./assets/CuceiImagenes/Modulo_Z3.jpg"),
      require("./assets/CuceiImagenes/Modulo_Z4.jpg"),
    ]
  },
  {
    id: 27,
    buttonName: "Alpha",
    moduleName: "Modulo Alpha",
    x: 460,
    y: 150,
    description: "Aulas para de computacion e informatica",
    images: [
      require("./assets/CuceiImagenes/Modulo_Alpha1.jpg"),
      require("./assets/CuceiImagenes/Modulo_Alpha2.jpg"),
      require("./assets/CuceiImagenes/Modulo_Alpha3.jpg"),
      require("./assets/CuceiImagenes/Modulo_Alpha4.jpg"),
    ]
  },
  {
    id: 28,
    buttonName: "Beta",
    moduleName: "Modulo Beta",
    x: 490,
    y: 170,
    description: "Aulas para de computacion e informatica",
    images: [
      require("./assets/CuceiImagenes/Modulo_Beta1.jpg"),
      require("./assets/CuceiImagenes/Modulo_Beta2.jpg"),
      require("./assets/CuceiImagenes/Modulo_Beta3.jpg"),
      require("./assets/CuceiImagenes/Modulo_Beta4.jpg"),
    ]
  },
  {
    id: 29,
    buttonName: "S2",
    moduleName: "Modulo S2",
    x: 255,
    y: 225,
    description: "Modulo dedicado al retiro de profesores",
    images: [
      require("./assets/CuceiImagenes/Modulo_S2_1.jpg"),
      require("./assets/CuceiImagenes/Modulo_S2_2.jpg"),
      require("./assets/CuceiImagenes/Modulo_S2_3.jpg"),
      require("./assets/CuceiImagenes/Modulo_S2_4.jpg"),
    ]
  },
  {
    id: 30,
    buttonName: "V2",
    moduleName: "Modulo V2",
    x: 240,
    y: 195,
    description: "Aulas para de fisica",
    images: [
      require("./assets/CuceiImagenes/Modulo_V2_1.jpg"),
      require("./assets/CuceiImagenes/Modulo_V2_2.jpg"),
      require("./assets/CuceiImagenes/Modulo_V2_3.jpg"),
      require("./assets/CuceiImagenes/Modulo_V2_4.jpg"),
    ]
  },
  {
    id: 31,
    buttonName: "Z1",
    moduleName: "Modulo Z1 y Z2",
    x: 180,
    y: 310,
    description: "Aulas para varias materias",
    images: [
      require("./assets/CuceiImagenes/Modulo_Z1_1.jpg"),
      require("./assets/CuceiImagenes/Modulo_Z1_2.jpg"),
      require("./assets/CuceiImagenes/Modulo_Z1_3.jpg"),
      require("./assets/CuceiImagenes/Modulo_Z1_4.jpg"),
    ]
  },
  {
    id: 32,
    buttonName: "Biblioteca",
    moduleName: "Biblioteca",
    x: 690,
    y: 230,
    description: "Libreria con monton de informacion",
    images: [
      require("./assets/CuceiImagenes/Biblioteca_1.jpg"),
      require("./assets/CuceiImagenes/Biblioteca_2.jpg"),
      require("./assets/CuceiImagenes/Biblioteca_3.jpg"),
      require("./assets/CuceiImagenes/Biblioteca_4.jpg"),
    ]
  },
  {
    id: 33,
    buttonName: "Jobs",
    moduleName: "Modulo jobs",
    x: 415,
    y: 130,
    description: "Aulas para estudiantes de jobs",
    images: [
      require("./assets/CuceiImagenes/Modulo_Jobs1.jpg"),
      require("./assets/CuceiImagenes/Modulo_Jobs2.jpg"),
      require("./assets/CuceiImagenes/Modulo_Jobs3.jpg"),
      require("./assets/CuceiImagenes/Modulo_Jobs4.jpg"),
    ]
  },
  {
    id: 34,
    buttonName: "Comida",
    moduleName: "Area de comida",
    x: 120,
    y: 220,
    description: "Zona donde puedes encontrar variedad de alimentos",
    images: [
      require("./assets/CuceiImagenes/Comida_1.jpg"),
      require("./assets/CuceiImagenes/Comida_2.jpg"),
      require("./assets/CuceiImagenes/Comida_3.jpg"),
      require("./assets/CuceiImagenes/Comida_4.jpg"),
    ]
  },
  {
    id: 35,
    buttonName: "Auditorio",
    moduleName: "Titanic",
    x: 340,
    y: 120,
    description: "Nose como se llama el auditorio, solo no me dejaron entrar el dia que fui",
    images: [
      require("./assets/CuceiImagenes/Modulo_Titanic1.jpg"),
      require("./assets/CuceiImagenes/Modulo_Titanic2.jpg"),
      require("./assets/CuceiImagenes/Modulo_Titanic3.jpg"),
      require("./assets/CuceiImagenes/Modulo_Titanic4.jpg"),
    ]
  },
  {
    id: 36,
    buttonName: "L2",
    moduleName: "Auditorio Matute remus",
    x: 430,
    y: 190,
    description: "Auditorio donde se llevan a cabo varias conferencias",
    images: [
      require("./assets/CuceiImagenes/Modulo_Matute1.jpg"),
      require("./assets/CuceiImagenes/Modulo_Matute2.jpg"),
      require("./assets/CuceiImagenes/Modulo_Matute3.jpg"),
      require("./assets/CuceiImagenes/Modulo_Matute4.jpg"),
    ]
  }
];
  }

  AbrirVentana = (location) => {

    console.log("Abriendo ubicacion: " + location.buttonName);

    this.setState({
      //Funcion para abrir ventana emrgente (modal)
      num1: location,
      modalVisible: true,
      NumImagen: 0
    });
  };

  CerrarVentana = () => {
    console.log("Cerrando ventana");
    
    this.setState({
      //Funcion para cerrar la ventana
      modalVisible: false,
      num1: null,
      NumImagen: 0
    });
  };

  nextImage = () => {
    //Funcion para el carrusel, siguiente imagen
    
    const { num1, NumImagen } = this.state;
    if (num1 && NumImagen < num1.images.length - 1) {
      this.setState({ NumImagen: NumImagen + 1 });
    }

    console.log("Siguiente Imagen: " + this.state.NumImagen);
  };

  prevImage = () => {
    
    //Funcion para el carrusel, imagen anterior
    const { NumImagen } = this.state;
    if (NumImagen > 0) {
      this.setState({ NumImagen: NumImagen - 1 });
    }

    console.log("Siguiente Previa: " + this.state.NumImagen);
  };

  render() {
    const { modalVisible, num1, NumImagen } = this.state;
    const screenWidth = Dimensions.get('window').width;

    return (
      <View style={{
        flex: 1,
        backgroundColor: "#1E0056",
      }}>
        
        <ImageBackground style={{
          flex: 1,
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
        }}
        source={require("./assets/Fondos/Fondo_Mapa.png")}>

        <Text style={{
          fontSize: 30,
          textAlign: "center",
          marginTop: "10%",
          color: "white"
        }}>Mapa</Text>

        {/* Aqui empieza el mapa */}
        <View style={{
          flex: 1
        }}>

          <ScrollView horizontal>
            <Image 
              source={require("./assets/mapa_2024.png")} 
              style={{
                width: Dimensions.get('window').width * 2.5, // Mapa más ancho que la pantalla
                height: '100%',
                marginTop : -80,
              }}
              resizeMode="contain"
            />
            
            {/* Botones sobre el mapa */}
            {this.locations.map((location) => (
              <TouchableOpacity
                key={location.id}
                style={[
                  {
                    position: 'absolute',//Posicion Absoluta
                    backgroundColor: '#a08f92ff',//Color boton
                    paddingHorizontal: 5,//Borde derecho y izquierdo
                    borderRadius: 10,//Redondo
                    borderWidth: 2,//Grozor del borde
                    borderColor: 'white',//Color borde
                    alignItems: 'center',//Texto Centrado
                  },
                  {
                    left: location.x,//Coordenadas x del boton
                    top: location.y,//Coordenadas y del boton
                  }
                ]}
                onPress={() => this.AbrirVentana(location)}
              >
                <Text style={{
                    color: 'white',//Color letra boton
                    fontSize: 12,//Tamaño letra
                    textAlign: 'center'
                  }}>{location.buttonName}</Text>
              </TouchableOpacity>
            ))}

          </ScrollView>
        </View>

        {/* Ventana emrgente */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={this.CerrarVentana}
        >
          <View style={{
            flex: 1,
            justifyContent: 'center',//Centrar Ventana emergente valing
            alignItems: 'center',//Centrar Ventana emergente haling
            backgroundColor: 'rgba(0, 0, 0, 0.5)',//Color del fondo mas oscuro
            padding: 10,//Tamaño horizontal de ventana
          }}>
            <View style={{
              backgroundColor: 'white',//Color del fondo de informacion
              borderRadius: 15,//Borde suave de la ventana
              width: '90%',
              maxHeight: '80%',
              overflow: 'hidden',
            }}>
              {num1 && (
                <>
                  {/* Header del modal */}
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,//Espacio de parte de arriba (osea el nombre del modulo)
                    backgroundColor: '#5e5b64ff',//Color de la ventana arriba
                  }}>
                    <Text style={{
                      fontSize: 20,//Tamaño de nombre de modulo
                      color: 'white',
                      flex: 1
                    }}>{num1.moduleName}</Text>
                    <TouchableOpacity onPress={this.CerrarVentana} style={{padding: 5}}>
                      <Text style={{
                        fontSize: 18,
                        color: 'white'
                        }}>X</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Carrusel de imágenes */}
                  <View style={{
                    height: 200,
                    position: 'relative'
                    }}>
                    <Image 
                      source={num1.images[NumImagen]} 
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      resizeMode="cover"
                    />
                    
                    {/* Controles del carrusel */}
                    {num1.images.length > 1 && (
                      <View style={{
                        position: 'absolute',
                        bottom: 10,//Posicion de botones para el carrusel
                        left: 0,
                        right: 0,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                      }}>
                        <TouchableOpacity 
                          onPress={this.prevImage} 
                          style={styles.BotonCarrusel}
                          disabled={NumImagen === 0}
                        >
                          <Text style={[
                            styles.TextoBotonCarrusel,
                            NumImagen === 0 && {opacity: 0.5}
                          ]}>‹</Text>
                        </TouchableOpacity>
                        
                        <Text style={{
                          color: 'white',//Color del texto que dice en que imagen estas
                          fontSize: 16,//Tamaño
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',//Color del cuadrito
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          borderRadius: 10,
                        }}>
                          {NumImagen + 1} / {num1.images.length}
                        </Text>
                        
                        <TouchableOpacity 
                          onPress={this.nextImage} 
                          style={styles.BotonCarrusel}
                          disabled={NumImagen === num1.images.length - 1}
                        >
                          <Text style={[
                            styles.TextoBotonCarrusel,
                            NumImagen === num1.images.length - 1 && {opacity: 0.5}
                          ]}>›</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>

                  {/* Descripción */}
                  <View style={{
                    padding: 15,
                  }}>
                    <Text style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: '#000000ff',//Color texto de descripcion
                      textAlign: 'justify',
                    }}>
                      {num1.description}
                    </Text>
                  </View>

                  {/* Botón Aceptar */}
                  <View style={{
                    padding: 15,
                    paddingTop: 0,
                  }}>
                    <TouchableOpacity //Boton aceptar
                      onPress={this.CerrarVentana}
                      style={{
                        backgroundColor: '#8b8794ff',
                        paddingVertical: 12,
                        borderRadius: 10,
                        alignItems: 'center',
                        marginTop: 10,
                      }}
                    >
                      <Text style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',//Termina Boton aceptar
                      }}>Cerrar</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>

        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  BotonCarrusel: {
    //Se utiliza varias veces en el codigo
    backgroundColor: '#8b8794ff',//Color de los botones del carrusel
    borderRadius: 20,//Redondear botones
    width: 40,//Tamaño de los botones
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextoBotonCarrusel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
});