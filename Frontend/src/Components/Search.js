import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList,Image, List } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import SearchBox from './SearchBox'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import Store from '../Store/configureStore'
import { ListItem, Avatar} from 'react-native-elements';


function Search(props){
    const [value, setValue] = useState();
    const [pseudo, setPseudo] = useState();
    const [img, setImg] = useState("https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg");
    const [json, setJson] = useState();
    const [bddError, setBddError] = useState("Find users");
    const [bio, setBio] = useState();


  const _handleFollow = async () => {
    console.log('pseudo'+pseudo)
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer' + ' ' + props.authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userFollowed: pseudo,
      })
    }
    const response = await fetch("http://192.168.1.22:9000/api/user/follow", requestOptions);
  }



  function updateSearch(value) {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'pseudo': value
      }
    }
    fetch("http://192.168.1.22:9000/api/user/search", requestOptions)
      .then(function (response) {
        if (!response.ok) {
          setBddError("Can't find this user")
        }
        else {
          setBddError("")
          response.json().then ((json) => {
          setJson(json)
          console.log(JSON.stringify(json))
          })
        }
      })

      .catch((error) => console.error(error))
  }

  function preventDefault(item){
    props.navigation.navigate('FriendProfile', {
      pseudo: item.pseudo,
      mail: item.mail,
      PPuri: item.userPP,
      bio: item.bio, 
      following: item.following, 
      followers: item.followers }) 
  }
  
    return (
      <View style={styles.container}>
        <View style={{ height: '20%', borderRadius: 10}}>
            <SearchBox
                value={value}
                updateSearch={updateSearch}
            />          
        </View>
        { bddError ?
          <Text>Make a research</Text>
          :
          <View>
          <FlatList
            data={json}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
            <TouchableOpacity style={styles.button} underlayColor={"COLOR"} style = {styles.button} onPress = {() => preventDefault(item)}>
              <ListItem containerStyle={{ borderBottomWidth: 1 }}>
                  <Avatar source={{uri: item.userPP}} />
                  <ListItem.Content>
                    <ListItem.Title>{item.pseudo}</ListItem.Title>
                    <ListItem.Subtitle>{item.mail}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron color="black" />
               </ListItem>
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
});

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(Search)