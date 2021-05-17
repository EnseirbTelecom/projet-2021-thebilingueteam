import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import SearchBox from './SearchBox'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import Store from '../Store/configureStore'


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
    const response = await fetch("http://192.168.1.78:9000/api/user/follow", requestOptions);
  }



  function updateSearch(value) {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'pseudo': value
      }
    }
    fetch("http://192.168.1.78:9000/api/user/search", requestOptions)
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
          :<FlatList
            data={json}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
             <Text>{item.pseudo}</Text>
            )}
            /> 
            
        }
        
       </View>
          
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red', height: '100%', width: '100%' 
  },
});

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(Search)