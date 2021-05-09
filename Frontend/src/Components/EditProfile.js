import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

import { Icon, Container, Content, Header, Left, Body, Right } from 'native-base'

import { Provider } from 'react-redux'
import Store from '../Store/configureStore'
import { connect } from 'react-redux'
import { TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

class EditProfile extends React.Component {
    constructor(props){
    super(props)
    this.state = {
        username: '',
        profilePictureURI:'https://images.bfmtv.com/AFn-Kh1iHnrSraLWJEPT-KPs6SI=/40x3:584x309/640x0/images/-67818.jpg',
        bio: '',
    }
}

_handleEditProfile(){

}

async choosePhoto(){
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled){
      this.setState({profilePictureURI: result.uri})
    }
}

sendUserBio(){

    fetch("http://localhost:9000/api/user/bio", {
                            method: 'POST',
                            headers: {
                                'Authorization' : 'Bearer' + ' ' + this.props.authToken,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                bio: this.state.bio
                            })
                            })
}

async sendUserPic(){
  const response = await fetch(this.state.profilePictureURI);
  const blob = await response.blob();
  console.log(blob);  

  const data = new FormData();
  data.append('profilePicture', response);

  const req = {
    method: 'POST',
    headers: {
        'Authorization' : 'Bearer' + ' ' + this.props.authToken,
        'Content-Type': 'multipart/form-data'
    },
    body:data
  }
  fetch("http://localhost:9000/api/user/profilePicture", req)                         
}
  render(){
      return(
          <Provider store={Store}>
            <Container style={{ flex: 1, backgroundColor: 'white'}}>
            <Header style={{backgroundColor: 'white'}}>
                <Text>EditProfile</Text>
                <Right>
              <TouchableOpacity
              onPress={() => {
                this.sendUserBio();
                //this.sendUserPic();
                this.props.navigation.navigate('User Page');

              }}
              style={{ flex: 1, width:"80%", backgroundColor:"#fb5b5a", borderRadius:25, height:40, alignItems:"center", justifyContent:"center", marginTop:10, marginBottom:10 }}>
                 <Text style={{color: 'white'}}>Save</Text>
              </TouchableOpacity>
            </Right>
            </Header>
            <Body>
            <TouchableOpacity
              onPress={() => this.choosePhoto()}>
                  <Image
                  style={{ width: 135, height: 135, borderRadius: 75, marginTop:50 }}
                  source={{
                    uri: this.state.profilePictureURI
                  }}/>
            </TouchableOpacity>
            <View
                  style={{flex:0.2,width:300,alignItems:'center', justifyContent:'space-around'}}>
              <TextInput
              placeholder='Bio'
              placeholderTextColor="grey"
              onChangeText={(bio) => this.setState({bio})}
              style={{width: 300, borderRadius:5,borderWidth:'1', borderColor:'grey'}}></TextInput>
            </View>
            </Body>
            </Container>
          </Provider>
      )
  }
}

const mapStateToProps = (state) => {
    return state
}
  
export default connect(mapStateToProps)(EditProfile)
