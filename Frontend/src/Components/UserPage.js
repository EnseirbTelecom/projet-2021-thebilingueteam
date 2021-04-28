import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

import { Icon, Container, Content, Header, Left, Body, Right } from 'native-base'



class UserPage extends React.Component {


  render() {
    return (
        <Container style={{ flex: 1, backgroundColor: 'white'}}>
          <Header style={{backgroundColor: 'white'}}>

            <Body><Text style={{fontWeight: 'bold'}}>Pablo Escobar</Text></Body>
            <Right>
              <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignIn')}
              style={{ flex: 1, width:"80%", backgroundColor:"#fb5b5a", borderRadius:25, height:30, alignItems:"center", justifyContent:"center", marginTop:10, marginBottom:10 }}>
                 <Text style={{color: 'white'}}>Disconnection</Text>
              </TouchableOpacity>
            </Right>
          </Header>

          <Content>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex:1, paddingLeft: 5, justifyContent: 'space-around'  }}>
                  <Image
                  style={{ width: 75, height: 75, borderRadius: 37.5 }}
                  source={{
                    uri: 'https://images.bfmtv.com/AFn-Kh1iHnrSraLWJEPT-KPs6SI=/40x3:584x309/640x0/images/-67818.jpg',
                  }}/>
                </View>
                <View style={{ flex:3 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ alignItems: 'center' }}>
                      <Text>20</Text>
                      <Text style={{ fontSize: 10, color: 'grey' }}>posts</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Text>100</Text>
                      <Text style={{ fontSize: 10, color: 'grey' }}>followers</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Text>109</Text>
                      <Text style={{ fontSize: 10, color: 'grey' }}>following</Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 1, width:"80%", backgroundColor:"#fb5b5a", borderRadius:25, height:30, alignItems:"center", justifyContent:"center", marginTop:10, marginBottom:10 }}>
                      <Text style={{color: 'white'}}>Edit Profile</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              </View>

              <View style={{ paddingBottom: 10, paddingHorizontal: 10 }}>
                <Text style={{ fontWeight: 'bold'}}> Pablo Escobar</Text>
                <Text>Welcome on my instagram page, I am Pablo Escobar the great cocaine dealer!</Text>
              </View>

            </View>
          </Content>
        </Container>
    )
  }
}



export default UserPage