import React, { Component } from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default class Directorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creditosInfo: null
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
          creditosInfo: {
            creditos: userData.creditos,
            creditosRequeridos: userData.creditosRequeridos,
            certificado: userData.certificado,
            promedio: userData.promedio,
            creditosAreas: userData.creditosAreas
          }
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

  renderProgressBar = (obtenidos, requeridos, color) => {
    const porcentaje = (obtenidos / requeridos) * 100;
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      }}>
        <View style={{
          flex: 1,
          height: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: 5,
          marginRight: 10,
          overflow: 'hidden',
        }}>
          <View 
            style={{
              height: '100%',
              borderRadius: 5,
              width: `${Math.min(porcentaje, 100)}%`,
              backgroundColor: color
            }} 
          />
        </View>
        <Text style={{
          color: 'white',
          fontSize: 12,
          fontWeight: 'bold',
          minWidth: 40,
        }}>{porcentaje.toFixed(1)}%</Text>
      </View>

      
    );
  }

  renderAreaCredits = (areaData, index) => {
    const areaColors = {
      'FORMACION BASICA COMUN': 'white',
      'BASICO PARTICULAR OBLIGATORIA': 'white',
      'ESPECIALIZANTE OBLIGATORIA': 'white',
      'ESPECIALIZANTE SELECTIVA': 'white',
      'OPTATIVA ABIERTA': 'white'
    };

    const color = areaColors[areaData.area] || '#CCCCCC';
    
    return (
      <View key={index} style={{
        left : 20,
        backgroundColor: 'transparent',
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: 'transparent',
        width : "90%",
      }}>

        <ImageBackground
            source={require('./assets/Iconos/Icono_Base_Azul.png')}
            imageStyle={{ borderRadius: 10 }} // respeta el borde redondeado
            style={{
              //flexDirection: 'row',
              //justifyContent: 'space-between',
              //alignItems: 'center',
              padding: 15,
              borderColor: 'transparent',
              borderWidth: 3,
              marginVertical: 5,
              borderRadius: 10,
              overflow: 'hidden', // asegura que la imagen se recorte al borde
            }}
            resizeMode="cover" // la imagen cubre todo el fondo
          >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            flex: 1,
          }}>{this.formatAreaName(areaData.area)}</Text>
          <Text style={{
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
          }}>
            {areaData.creditos} / {areaData.requeridos} créditos
          </Text>
        </View>
        
        {this.renderProgressBar(areaData.creditos, areaData.requeridos, color)}
        
        <View style={{
          marginTop: 5,
        }}>
          <Text style={{
            color: 'white',
            fontSize: 14,
            marginBottom: 2,
          }}>
            Obtenidos: <Text style={{
              color: 'white',
              fontWeight: 'bold',
            }}>{areaData.creditos}</Text>
          </Text>
          <Text style={{
            color: 'white',
            fontSize: 14,
            marginBottom: 2,
          }}>
            Faltantes: <Text style={{
              color: 'white',
              fontWeight: 'bold',
            }}>{areaData.faltantes}</Text>
          </Text>
          <Text style={{
            color: 'white',
            fontSize: 14,
            marginBottom: 2,
          }}>
            Requeridos: <Text style={{
              color: 'white',
              fontWeight: 'bold',
            }}>{areaData.requeridos}</Text>
          </Text>
        </View>

        </ImageBackground>
      </View>
    );
  }

  formatAreaName = (area) => {
    const names = {
      'FORMACION BASICA COMUN': 'BASICO COMUN',
      'BASICO PARTICULAR OBLIGATORIA': 'BASICO PARTICULAR OBLIGATORIA',
      'ESPECIALIZANTE OBLIGATORIA': 'ESPECIALIZANTE OBLIGATORIA',
      'ESPECIALIZANTE SELECTIVA': 'ESPECIALIZANTE SELECTIVA',
      'OPTATIVA ABIERTA': 'OPTATIVA ABIERTA'
    };
    return names[area] || area;
  }

  render() {
    const { creditosInfo } = this.state;

    return (
      <View style={{
        flex: 1,
        backgroundColor: "#1E0056",
      }}>
        <ImageBackground 
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
          source={require("./assets/Fondos/Fondo_Alumno.png")}
        >
          <Text style={{
            fontSize: 30,
            
            textAlign: "center",
            marginTop: "10%",
            color: "white",
            marginBottom: 20,
          }}>Avance de Creditos</Text>

          {creditosInfo ? (
            <ScrollView style={{
              flex: 1,
              
            }} showsVerticalScrollIndicator={false}>

              <ImageBackground
                  source={require('./assets/Iconos/Icono_Base_Azul.png')}
                  imageStyle={{ borderRadius: 10 }} // respeta el borde redondeado
                  style={{
                    //flexDirection: 'row',
                    //justifyContent: 'space-between',
                    //alignItems: 'center',
                    left : 20,
                    
                    maxWidth : 360,
                    borderColor: 'transparent',
                    borderWidth: 3,
                    marginVertical: 5,
                    borderRadius: 10,
                    overflow: 'hidden', // asegura que la imagen se recorte al borde
                  }}
                  resizeMode="cover" // la imagen cubre todo el fondo
                >

              <View style={{
                backgroundColor: 'transparent',
                padding: 15,
                
                width : "90%",
                
                borderWidth: 1,
                borderColor: 'transparent',
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 10,
                  textAlign: 'center',
                }}>Resumen General</Text>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                  <Text style={{
                    color: 'white',
                    fontSize: 16,
                    marginBottom: 5,
                  }}>
                    Total Obtenidos: <Text style={{
                      color: 'white',
                      fontWeight: 'bold',
                    }}>{creditosInfo.creditos}</Text>
                  </Text>
                  <Text style={{
                    color: 'white',
                    fontSize: 16,
                    marginBottom: 5,
                  }}>
                    {"    "}Total Requeridos: <Text style={{
                      color: 'white',
                      fontWeight: 'bold',
                    }}>{creditosInfo.creditosRequeridos}</Text>
                  </Text>
                </View>

                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                  <View style={{
                    flex: 1,
                    height: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: 5,
                    marginRight: 10,
                    overflow: 'hidden',
                  }}>
                    <View 
                      style={{
                        height: '100%',
                        borderRadius: 5,
                        width: `${Math.min((creditosInfo.creditos / creditosInfo.creditosRequeridos) * 100, 100)}%`,
                        backgroundColor: 'white'
                      }} 
                    />
                  </View>

                  {/*Creditos requeridos*/}
                  <Text style={{
                    color: 'white',
                    fontSize: 12,
                    fontWeight: 'bold',
                    minWidth: 40,
                  }}>
                    {((creditosInfo.creditos / creditosInfo.creditosRequeridos) * 100).toFixed(1)}%
                  </Text>
                </View>

                {/*Promedio*/}
                <Text style={{
                  color: 'white',
                  fontSize: 16,
                  marginBottom: 5,
                }}>
                  Promedio: <Text style={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}>{creditosInfo.promedio}</Text>
                </Text>

                {/*Certificado*/}
                <Text style={{
                  color: 'white',
                  fontSize: 16,
                  marginBottom: 5,
                }}>
                  Certificado: <Text style={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}>{creditosInfo.certificado}</Text>
                </Text>
              </View>
              </ImageBackground>
              <Text style={{
                color: 'white',
                fontSize: 22,
                fontWeight: 'bold',
                marginBottom: 15,
                textAlign: 'center',
              }}>Avance por Área</Text>
              {creditosInfo.creditosAreas && creditosInfo.creditosAreas.map((area, index) => 
                this.renderAreaCredits(area, index)
              )}
            </ScrollView>
          ) : (
            <Text style={{
              color: 'red',
              textAlign: 'center',
              fontSize: 18,
              marginTop: 50,
            }}>No se encontraron datos de créditos</Text>
          )}

        </ImageBackground>
      </View>
    );
  }
}