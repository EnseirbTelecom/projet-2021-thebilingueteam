import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import SearchBox from './SearchBox'


class Search extends React.Component {

  render() {
    return (
      <View style={styles.container}>
      <View style={{ height: '20%', backgroundColor: "#fb5b5a", borderRadius: 10}}>
          <SearchBox
              style={{ marginTop: '10%' }}
          />
      </View>

  </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      // backgroundColor: 'red', height: '100%', width: '100%' 
  },
});

export default Search