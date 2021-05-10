import * as React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux'


class SignIn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError:'',
            bddError: '',
            token: '',
        }
    }

    _handleAuth() {
        //console.log(this.state.token);
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

    accountExist(){
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'mail': this.state.email,
                'password': this.state.password,
            },
        }
        fetch("http://192.168.1.78:9000/api/login", requestOptions)
        .then((response) => {    
            console.log(response.status); // Will show you the status
            if (!response.ok) {
                this.setState({bddError: 'Email ou mot de passe invalides'});
            }
            return response.json();
        })
        .then((responseData) => {
            if (this.state.bddError == ''){
                this.setState({ token: responseData})
                this._handleAuth()
                this.props.navigation.navigate('Home');
                console.log('account exits')
            }else{
                console.log('account doesnt exits')
            }
        })
        .catch((error) => {
        console.error(error);
        });
    }

    onSubmit(){
        this.setState({bddError: ''});
        const emailValid = this.emailValidator();
        const passwordValid = this.passwordValidator();
        if (emailValid == true && passwordValid == true){
            console.log("Form is correct, let's verify the account exist in the database");
            return true;
        }
        console.log("Form is incorrect");
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
                            secureTextEntry
                            style={styles.inputText}
                            placeholder="Password"
                            placeholderTextColor="white"
                            onChangeText={(password) => this.setState({password})}/>
                    </View>
                    <Text style={styles.validator}>{this.state.passwordError}</Text>
                    <Text style={styles.validator}>{this.state.bddError}</Text>
                    <TouchableOpacity>
                        <Text style={styles.forgot}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        if (this.onSubmit() == true){
                            this.accountExist();
                        }
                    }}
                    
                    style={styles.loginBtn}>
                    <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => 
                        this.props.navigation.navigate('SignUp')}>
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
    validator:{
        color:'red',
        alignItems: 'center',
        fontSize:15
    },
    loginText:{
        color:"white"
    }
});

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(SignIn)