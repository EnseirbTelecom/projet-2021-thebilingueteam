import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

export default function Searchbar({ value, updateSearch }) {

    const [query, setQuery] = useState();
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <SearchBar
            round
            searchIcon={{ size: 24 }}
            value={query}
            placeholder="Search user..."
            placeholderTextColor="white"
            containerStyle={styles.container}
            inputStyle={styles.input}
            platform={Platform.OS}
            onChangeText={(text) => {
            setQuery(text)
              if (text != "") {
            updateSearch(text)
              }
             }
            }
          />
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#900C3F',
    },

    input: {
        backgroundColor: '#fb5b5a',
        borderRadius:15,
    }
  });