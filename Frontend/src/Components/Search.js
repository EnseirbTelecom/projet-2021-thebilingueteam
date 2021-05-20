import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, List } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import SearchBox from './SearchBox'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import Store from '../Store/configureStore'
import { ListItem, Avatar } from 'react-native-elements';


function Search(props) {
  const [value, setValue] = useState();
  const [myPseudo, setMyPseudo] = useState();
  const [img, setImg] = useState("https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg");
  const [json, setJson] = useState();
  const [bddError, setBddError] = useState("Find users");
  const [bio, setBio] = useState();

  
  useEffect(() => {
    //console.log('My Token :' + props.authToken);
  async function getUserInfo () {

    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer' + ' ' + props.authToken,
        'Content-Type': 'application/json'
      },
    }
    const response = await fetch("http://192.168.1.22:9000/api/user/pseudo", requestOptions);
    const json = await response.json();
    setMyPseudo(json)
  }
getUserInfo()
})

  function updateSearch(value) {
    console.log(myPseudo)
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'query': value,
        'myPseudo': myPseudo
      }
    }
    fetch("http://192.168.1.22:9000/api/user/search", requestOptions)
      .then(function (response) {
        if (!response.ok) {
          setBddError("Can't find this user")
        }
        else {
          setBddError("")
          response.json().then((json) => {
            setJson(json)
           // console.log(JSON.stringify(json))
          })
        }
      })

      .catch((error) => console.error(error))
  }

  function preventDefault(item) {
    props.navigation.navigate('FriendProfile', {
      authToken: props.authToken,
      pseudo: item.pseudo,
      mail: item.mail,
      PPuri: item.userPP,
      bio: item.bio,
      following: item.following,
      followers: item.followers
    })
  }
  
    return (
      <View style={styles.container}>
        <View style={styles.box}>
            <SearchBox
                value={value}
                updateSearch={updateSearch}
            />          
        </View>
        { bddError ?
          <View></View>
        : <View>
            <FlatList
              data={json}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
              <TouchableOpacity  onPress = {() => preventDefault(item)}>
                {myPseudo !== item.pseudo ?
                <ListItem style={styles.itemContainer}>  
                    <Avatar source={{uri: item.userPP}} />
                    <ListItem.Content>
                      <ListItem.Title>{item.pseudo}</ListItem.Title>     
                      <ListItem.Subtitle>{item.mail}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron color="black" />
                </ListItem> 
                : <View></View>}
              </TouchableOpacity>
              )}
              /> 
            </View>          
        }
      </View>
          
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    borderBottomWidth: 1,
  },
  box: {
    height: '20%', 
    borderRadius: 10,
  }
});

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(Search)