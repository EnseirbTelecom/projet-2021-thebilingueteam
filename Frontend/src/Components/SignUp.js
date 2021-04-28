import * as React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

class SignUp extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
        email: '',
        username: '',
        password: '',
        token:'',
    }
  }


  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>INP GRAM</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email"
                        placeholderTextColor="white"
                        onChangeText={(email) => this.setState({email})}/>
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Username"
                        placeholderTextColor="white"
                        onChangeText={(username) => this.setState({username})}/>
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Password"
                        placeholderTextColor="white"
                        onChangeText={(password) => this.setState({password})}/>
                </View>

                <TouchableOpacity 
                onPress={() => {
                    console.log(this.state);


                    fetch("http://192.168.1.78:9000/api", {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            mail: this.state.email,
                            pseudo: this.state.username,
                            password: this.state.password,
                        })
                    })
                    .then(response => response.json())
                    .then((responseData) => {
                        Alert.alert('Signup Success!');

                        //this.props.navigation.navigate('Home');
                    })
                    .catch((error) => {
                      console.error(error);
                    });

                }}

                    style={styles.loginBtn}>
                   <Text style={styles.loginText}>Create Account</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn')}>
                    <Text style={styles.forgot}>Sign In</Text>
                </TouchableOpacity>
        </View>
    )
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40
    },

    inputText:{
        height:50,
        color:"white"
    },

    forgot:{
        color:"#900C3F",
        fontSize:11
    },

    inputView:{
        width:"80%",
        backgroundColor:"#900C3F",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },

    loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    loginText:{
        color:"white"
    }
});

export default SignUp