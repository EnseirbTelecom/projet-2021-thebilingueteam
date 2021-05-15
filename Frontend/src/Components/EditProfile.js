import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Alert } from 'react-native';

import { Icon, Container, Content, Header, Left, Body, Right } from 'native-base'

import { Provider } from 'react-redux'
import Store from '../Store/configureStore'
import { connect } from 'react-redux'
import { TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function EditProfile({ route, navigation }) {

  const { authToken, bio, uri, setBio, setURI } = route.params;
  const [inputURI, setInputURI] = useState(uri);
  const [inputBio, setInputBio] = useState(bio);

  const choosePhoto = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
    })
    const uriB64 = "data:image/png;base64," + image.base64
    setInputURI(uriB64)
  }

  const sendUserBio = () => {
    fetch("http://192.168.1.78:9000/api/user/bio", {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer' + ' ' + authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bio: inputBio
      })
    })
  }

  const sendUserPic = () => {
    fetch("http://192.168.1.78:9000/api/user/profilePicture", {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer' + ' ' + authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imgsource: inputURI
      })

    }).then((res) => console.log(json.res))
  }
  return (
    <Provider store={Store}>
      <Container style={{ flex: 1, backgroundColor: 'white' }}>
        <Header style={{ backgroundColor: 'white' }}>
          <Body><Text style={{ fontWeight: 'bold' }}>Edit Profile</Text></Body>
          <Right>
            <TouchableOpacity
              onPress={() => {
                sendUserBio();
                sendUserPic();
                setBio(inputBio);
                setURI(inputURI);
                navigation.navigate('User Page');
              }}
              style={{ flex: 1, width: "80%", backgroundColor: "#fb5b5a", borderRadius: 25, height: 30, alignItems: "center", justifyContent: "center", marginTop: 10, marginBottom: 10 }}>
              <Text style={{ color: 'white' }}>Save</Text>
            </TouchableOpacity>
          </Right>
        </Header>
        <Body>
          <TouchableOpacity
            onPress={() => choosePhoto()}>
            <Image
              style={{ width: 135, height: 135, borderRadius: 75, marginTop: 50 }}
              source={{ uri: inputURI }} />
          </TouchableOpacity>
          <View
            style={{ flex: 0.2, width: 300, alignItems: 'center', justifyContent: 'space-around' }}>
            <TextInput
              placeholder='Bio'
              value={inputBio}
              placeholderTextColor="grey"
              onChangeText={(text) => setInputBio(text)}
              style={{ width: 300, borderRadius: 5, borderWidth: 1, borderColor: 'grey' }}></TextInput>
          </View>
        </Body>
      </Container>
    </Provider>
  )

}

export default EditProfile