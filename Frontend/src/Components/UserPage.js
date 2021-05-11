import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

import { Icon, Container, Content, Header, Left, Body, Right } from 'native-base'

import EditProfile from './EditProfile'

import { Provider } from 'react-redux'
import Store from '../Store/configureStore'
import { connect } from 'react-redux'




function UserPage(props) {

const [username, setUserName] = useState('');

const [profilePictureURI, setProfilePictureURI] = useState('https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg');
const [bio,setBio] = useState('');

useEffect(() => {
  getUserInfo();
})

  const _handleAuth = () => {
    const action = { type: "REMOVE_TOKEN", value: 'concombre' }
    props.dispatch(action)
  }

  const getUserInfo = async () => {

    const requestOptions = {
      method: 'GET',
      headers: { 
          'Authorization' : 'Bearer' + ' ' + props.authToken,
          'Content-Type': 'application/json'
      },
    }
    const response = await fetch("http://10.168.255.53:9000/api/user", requestOptions);
    const json = await response.json();
    console.log(json);
    setUserName(json.pseudo);
    setBio(json.bio);
    setProfilePictureURI(json.profilePicture)
  };
    return (
      <Provider store={Store}>
        <Container style={{ flex: 1, backgroundColor: 'white'}}>
          <Header style={{backgroundColor: 'white'}}>
            <Body><Text style={{fontWeight: 'bold'}}>{username}</Text></Body>
            <Right>
              <TouchableOpacity
              onPress={() => {
                _handleAuth()
                props.navigation.navigate('SignIn')
              }}
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
                  source={{uri: profilePictureURI}}/>
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
                    <TouchableOpacity 
                    onPress ={() => {
                      props.navigation.navigate('EditProfile',{authToken: props.authToken,bio: bio, uri: profilePictureURI, setBio: setBio,setURI: setProfilePictureURI})
                      console.log(props.authToken);
                    }}
                    style={{ flex: 1, width:"80%", backgroundColor:"#fb5b5a", borderRadius:25, height:30, alignItems:"center", justifyContent:"center", marginTop:10, marginBottom:10 }}>
                      <Text style={{color: 'white'}}>Edit Profile</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              </View>

              <View style={{ paddingBottom: 10, paddingHorizontal: 10 }}>
                <Text style={{ fontWeight: 'bold'}}>{username}</Text>
                <Text>{bio}</Text>
              </View>
            </View>
          </Content>
        </Container>
      </Provider>
    )
}




const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(UserPage)