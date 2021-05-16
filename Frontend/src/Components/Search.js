import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList,Image } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import SearchBox from './SearchBox'


function Search(props){
    const [value, setValue] = useState();
    const [pseudo, setPseudo] = useState();
    const [img, setImg] = useState("https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg");
    const [json, setJson] = useState();
    const [bddError, setBddError] = useState("Find users");


    function updateSearch(value) {
      const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'pseudo': value 
        }
      }
      fetch("http://192.168.1.22:9000/api/user/search", requestOptions)
      .then(function(response) {
        if(!response.ok) {
          setBddError("Can't find this user")
        }
        else{
          setBddError("")
          response.json().then ((json) => {
              setJson(json)
              setPseudo(json.pseudo)
              if (json.userPP) 
              {
                setImg(json.userPP)
              }
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
        {bddError ? 
        <Text>{bddError}</Text>
        :
        <View style = {{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',borderWidth: 2 }}>
          <TouchableHighlight
                        onPress={() => {
                          props.navigation.navigate('FriendProfile', {})
                        }}>
          <Image
              style={{ width: 60, height: 60, borderRadius: 37.5, margin: 20, marginRight: 20, }}
              source={{ uri: img }} 
              />
            </TouchableHighlight>
         <Text style={{ fontSize:25, borderLeftWidth: 2 , padding:15, margin:15,marginRight:35, }}>{pseudo}</Text>
         <Button
            raised="true"
            title="Add friend"
            icon={{
              name: "arrow-right",
              size: 15,

            }}
         />

        </View>
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
export default connect(mapStateToProps)(Search)