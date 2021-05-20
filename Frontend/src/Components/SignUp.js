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

import { connect } from 'react-redux'


class SignUp extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailError: '',
            username: '',
            usernameError: '',
            password: '',
            passwordError: '',
            bddError: '',
            token:'',
        }
    }

    _handleAuth() {
        console.log(this.state.token);
        const action = { type: "ADD_TOKEN", value: this.state.token }
        this.props.dispatch(action)
    }

    emailValidator(){
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.state.email == ''){
            this.setState({ emailError: 'Ce champ ne doit pas être vide'});
        }
        else{
            if (reg.test(this.state.email) === false) {
                this.setState({ emailError: 'email invalide'});
            }
            else {
                this.setState({ emailError: ''});
                return true;
            }
        }   
        return false;
    }

    usernameValidator(){
        if (this.state.username == ''){
            this.setState({ usernameError: 'Ce champ ne doit pas être vide'});
        }
        else{
            this.setState({ usernameError: ''});
            return true;
        }
        return false;
    }

    passwordValidator(){
        if (this.state.password == ''){
            this.setState({ passwordError: 'Ce champ ne doit pas être vide'});
        }
        else{
            this.setState({ passwordError: ''});
            return true;
        }
        return false;
    }

    onSubmit(){
        const emailValid = this.emailValidator();
        const usernameValid = this.usernameValidator();
        const passwordValid = this.passwordValidator();
        if (emailValid == true && usernameValid == true && passwordValid == true){
            console.log("Form is correct");
            return true;
        }else{
            console.log("Form is incorrect");
        }
        return false;
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
                    <Text style={styles.validator}>{this.state.emailError}</Text>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="Username"
                            placeholderTextColor="white"
                            onChangeText={(username) => this.setState({username})}/>
                    </View>
                    <Text style={styles.validator}>{this.state.usernameError}</Text>
                    <View style={styles.inputView} >
                        <TextInput
                            secureTextEntry
                            style={styles.inputText}
                            placeholder="Password"
                            placeholderTextColor="white"
                            onChangeText={(password) => this.setState({password})}/>
                    </View>
                    <Text style={styles.validator}>{this.state.passwordError}</Text>
                    <Text style={styles.validator}>{this.state.bddError}</Text>
                    <TouchableOpacity 
                    onPress={() => {
                        console.log(this.state);
                        if (this.onSubmit() == true){
                            console.log('Form sent to the server');

                            fetch("http://192.168.1.22:9000/api/signup", {
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
                            .then((response) => {
                                this.setState({bddError: ''});
                                console.log(response.status); // Will show you the status
                                if (!response.ok) {
                                    this.setState({bddError: 'email indisponible'});
                                    //throw new Error("HTTP status " + response.status);
                                }
                                return response.json();
                            })
                            .then((responseData) => {
                                if (this.state.bddError == ''){
                                    this.setState({ token: responseData});
                                    this._handleAuth();
                                    this.props.navigation.navigate('Home');
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                        }

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
    },
    validator:{
        color:'red',
        alignItems: 'center',
        fontSize:15
    }
});


const mapStateToProps = (state) => {
    return state
  }
  
  export default connect(mapStateToProps)(SignUp)