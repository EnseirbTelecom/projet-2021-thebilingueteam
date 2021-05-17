import React, {useState} from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity, Button, Alert, Modal} from 'react-native';
import {} from 'react-native';
import { Provider, connect } from 'react-redux'
import Store from '../Store/configureStore'
import { Icon, Card, CardItem, Thumbnail, Container, Content, Header, Left, Body, Right } from 'native-base'

function FriendProfile({route, navigation}) {
    const {pseudo, mail, PPuri, bio, following, followers} = route.params;
    const [postNumber,setPostNumber] = useState(0)

    return (
        <Container style={{ flex: 1, backgroundColor: 'white' }}>
          <Content>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, paddingLeft: 5, justifyContent: 'space-around' }}>
                  <View style={{width: 75, height: 75 ,borderRadius:37.5, backgroundColor:'#DCDCDC'}}>
                    <Image 
                    source={{uri: PPuri}}
                    style={{width: 75, height: 75 ,borderRadius:37.5}}
                    />
                  </View>
                </View>
                <View style={{ flex: 3 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ alignItems: 'center' }}>
                      <Text>{postNumber}</Text>
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
                    style={styles.followButton}
                    onPress={() => {
                        navigation.navigate('Search')
                    }}>
                    <Text style={styles.followText}>unFollow</Text>
                </TouchableOpacity>

                  </View>
                </View>
              </View>

              <View style={{ paddingBottom: 10, paddingHorizontal: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>{pseudo}</Text>
                {bio === '' ? (
                  <Text>Vous n'avez pas de description, ajoutez en une en editant votre profil !</Text>
                ) : (
                  <Text>{bio}</Text>
                )}
              </View>
            </View>
          </Content>
        </Container>
    )  
 }
const styles = StyleSheet.create({
    followButton: {
        width: "100%",
        backgroundColor: "#fb5b5a",
        borderRadius: 10,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
    },
    followText: {
        color: "white",
    }
});

const mapStateToProps = (state) => {
    return state
  }
  
  export default connect(mapStateToProps)(FriendProfile)

