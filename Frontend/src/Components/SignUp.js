import * as React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

class SignUp extends React.Component {

  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>INP GRAM</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email"
                        placeholderTextColor="white"
                        onChangeText={text => this.setState({email:text})}/>
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Username"
                        placeholderTextColor="white"
                        onChangeText={text => this.setState({username:text})}/>
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Password"
                        placeholderTextColor="white"
                        onChangeText={text => this.setState({password:text})}/>
                </View>

                <TouchableOpacity 
                onPress={() => {
                    this.props.navigation.navigate('Home');
                
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ mail: this.state.email, pseudo: this.state.username, password: this.state.password})
                    }

                    fetch("http://localhost:9000/api/", requestOptions)
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