import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

import { Icon, Container, Content, Header, Left, Body, Right } from 'native-base'

import { Provider } from 'react-redux'
import Store from '../Store/configureStore'
import { connect } from 'react-redux'




class UserPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        username: '',
        profilepic: require('../img/default_profile.jpg'),
        bio:'',
    }
}

  _handleAuth() {
    const action = { type: "REMOVE_TOKEN", value: 'concombre' }
    this.props.dispatch(action)
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
    this.setState({username: json.pseudo});


  };
  

  render() {
    return (
      <Provider store={Store}>
        <Container style={{ flex: 1, backgroundColor: 'white'}}>
          <Header style={{backgroundColor: 'white'}}>

            <Body><Text style={{fontWeight: 'bold'}}>{this.state.username}</Text></Body>
            <Right>
              <TouchableOpacity
              onPress={() => {
                this._handleAuth()
                this.props.navigation.navigate('SignIn')
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
                  source={
                    this.state.profilepic
                  }/>
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
                      console.log(this.props.authToken);
                      console.log(this.state.username);
                    }}
                    style={{ flex: 1, width:"80%", backgroundColor:"#fb5b5a", borderRadius:25, height:30, alignItems:"center", justifyContent:"center", marginTop:10, marginBottom:10 }}>
                      <Text style={{color: 'white'}}>Edit Profile</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              </View>

              <View style={{ paddingBottom: 10, paddingHorizontal: 10 }}>
                <Text style={{ fontWeight: 'bold'}}>{this.state.username}</Text>
                <Text>Welcome on my instagram page, I am Pablo Escobar the great cocaine dealer!</Text>
              </View>

            </View>
          </Content>
        </Container>
      </Provider>
    )
  }
}



const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(UserPage)