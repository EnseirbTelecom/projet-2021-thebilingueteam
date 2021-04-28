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

import { connect } from 'react-redux'


class SignIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        email: '',
        password: '',
        token: 'abc',
    }
  }

  _handleAuth() {
      console.log(this.state.token);
      const action = { type: "ADD_TOKEN", value: this.state.email }
      this.props.dispatch(action)
  }

  render() {
    console.log(this.props)
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
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Password"
                        placeholderTextColor="white"
                        onChangeText={(password) => this.setState({password})}/>
                </View>
                <TouchableOpacity
                onPress={() => this._handleAuth()}
                >
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('Home');

                    const requestOptions = {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        query: JSON.stringify({
                            mail: this.state.email,
                            password: this.state.password,
                        })
                    }

                    fetch("http://192.168.1.78:9000/api/", requestOptions)
                    .then(response => response.json())
                    .catch((error) => {
                      console.error(error);
                    });

                    }}
                
            
                
                style={styles.loginBtn}>
                   <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                    <Text style={styles.forgot}>Sign up</Text>
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

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(SignIn)