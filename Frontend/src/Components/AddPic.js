import React from 'react';
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { Provider } from 'react-redux'
import Store from '../Store/configureStore'
import { connect } from 'react-redux'


class AddPic extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: '',
      image64: '',
      title: '',
      description: '',
      date: '',
      username: '',
      userPP: '',
      time: '',
    }
  }

  onChangeTitle = (title) => {
    this.setState({ title })
  }

  onChangeDescription = (description) => {
    this.setState({ description })
  }

  checkTime = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  getCurrentDate = () => {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let time = new Date().getTime();

    m = this.checkTime(minutes);
    mo = this.checkTime(month);

    this.setState({ 
      date: date + '/' + mo + '/' + year + '   ' + hours + ':' + m,
      time: time,
  });
  }


  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {

    const requestOptions = {
      method: 'GET',
      headers: { 
          'Authorization' : 'Bearer' + ' ' + this.props.authToken,
          'Content-Type': 'application/json'
      },
    }

    const response = await fetch("http://192.168.1.78:9000/api/user", requestOptions);
    const json = await response.json();
    console.log(json);
    this.setState({ username: json.pseudo, userPP: json.userPP });
  };

  onSubmit = async () => {

    fetch("http://192.168.1.78:9000/api/posts/post", {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer' + ' ' + this.props.authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imgsource: "data:image/png;base64," + this.state.image64,
        title: this.state.title,
        description: this.state.description,
        date: this.state.date,
        userPP: this.state.userPP,
        username: this.state.username,
        time: this.state.time,
      })
    })

    Alert.alert('Post ajouté !');
    this.setState({ image: '', image64: '', description: '', title: ''})
  }


  selectImage = async () => {
    this.getCurrentDate();

    let selectedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
    })

    this.setState({ image: selectedImage.uri });
    this.setState({ image64: selectedImage.base64 });


  }


  render() {
    return (
      <Provider store={Store}>
        <View style={{ flex: 1 }}>

          <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            {this.state.image ? (
              <Image
                source={{ uri: this.state.image }}
                style={{ width: '100%', height: 200 }}
              />
            ) : (
              <TouchableOpacity
                onPress={this.selectImage}
                style={styles.loginBtn}
              >
                <Text style={styles.loginText}>Add an image</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text category="h4" style={styles.titleFont}>Post Details</Text>
            <View>
              <TextInput
                placeholder="Enter title of the post"
                style={{ margin: 20 }}
                value={this.state.title}
                onChangeText={title => this.onChangeTitle(title)}
              />
              <TextInput
                placeholder="Enter description"
                style={{ margin: 20 }}
                value={this.state.description}
                onChangeText={description => this.onChangeDescription(description)}
              />
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            {this.state.image ? (
              <TouchableOpacity
                onPress={
                  this.onSubmit
                }
                style={styles.postBtn}
              >
                <Text style={styles.loginText}>Add Post</Text>
              </TouchableOpacity>
            ) : (
              <Text></Text>
            )}
          </View>

        </View>
      </Provider>
    )
  }
}


const styles = StyleSheet.create({
  inputView: {
    width: "80%",
    backgroundColor: "#900C3F",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    padding: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleFont: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#fb5b5a",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10
  },
  postBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10
  },
  loginText: {
    color: "white",
    justifyContent: "center"
  }

});


const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(AddPic)