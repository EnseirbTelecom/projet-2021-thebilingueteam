import React from 'react';
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { Button } from 'native-base'

import * as ImagePicker from 'expo-image-picker';


class AddPic extends React.Component {
state = { 
        image:'',
        title: '', 
        description: '',
    }
  

    onChangeTitle = (title) => {
      this.setState({ title })
    }

    onChangeDescription = (description) => {
      this.setState({ description })
    }

    onSubmit = async () => {
        try {
          const post = {
            photo: this.state.image,
            title: this.state.title,
            description: this.state.description
          }
    
          this.setState({
            image: null,
            title: '',
            description: ''
          })
        } catch (e) {
          console.error(e)
        }
    }
  
  
    selectImage = async () => {

      let selectedImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
        base64: true,
      })

      this.setState({image: selectedImage.uri})

      {/*ImagePicker.launchImageLibraryAsync(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker')
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error)
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton)
        } else {
          const source = { uri: response.uri }
          console.log(source)
          this.setState({
            image: source
          })
        }
      })*/}
    }
  
    render() {
        return (
            <View style={{flex: 1}}>

                <View style={{ alignItems: 'center', justifyContent:'space-between'}}>
                    {this.state.image ? (
                    <Image
                        source={{uri: this.state.image}}
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

                <View style={{ alignItems: 'center'}}>
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

                <View style={{ alignItems: 'center'}}>
                    {this.state.image ? (
                        <TouchableOpacity
                            onPress={this.selectImage}
                            style={styles.postBtn}
                        >
                            <Text style={styles.loginText}>Add Post</Text>
                        </TouchableOpacity>
                        ) : (
                        <Text></Text>
                        )}
                </View>
                



            </View>
        )
    }
}


const styles = StyleSheet.create({
    inputView:{
        width:"80%",
        backgroundColor:"#900C3F",
        borderRadius:25,
        height:50,
        justifyContent:"center",
        padding:20
    },
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleFont:{
        fontWeight:"bold",
        fontSize:30,
        color:"#fb5b5a",
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:15,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        marginBottom:10
    },
    postBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:15,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        marginBottom:10
    },
    loginText:{
        color:"white",
        justifyContent:"center"
    }

});
  
export default AddPic