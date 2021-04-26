import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';

class Search extends React.Component {

  render() {
    return (
      <View style= {styles.container}>
         <Text style={styles.title}>
           Welcome on Search Page</Text>

        <Text style={styles.user}>
          User :
        </Text>
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
  title: {
    fontSize: 50,
  },
  user: {
    fontSize: 40,
  }
})


export default Search