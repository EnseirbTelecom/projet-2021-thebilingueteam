import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import SearchBox from './SearchBox'


export default function Search(){
    const [value, setValue] = useState()
    const [data, setData] = useState([]);


    function updateSearch(value) {
      const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'pseudo': value 
        }
      }
      fetch("http://192.168.1.22:9000/api/user/search", requestOptions)
      .then((response) => response.json())
      .then((json) => setData(json.pseudo))
      .catch((error) => console.error(error))
  }
    return (
      <View style={styles.container}>
        <View style={{ height: '20%', backgroundColor: "#fb5b5a", borderRadius: 10}}>
            <SearchBox
                style={{ marginTop: '10%' }}
                value={value}
                updateSearch={updateSearch}
            />
            {data ? <Text>no data</Text>: <View>{data}</View> }
        </View>

       </View>
    )
  }

const styles = StyleSheet.create({
  container: {
      flex: 1,
      // backgroundColor: 'red', height: '100%', width: '100%' 
  },
});
