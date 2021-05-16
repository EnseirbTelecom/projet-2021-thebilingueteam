import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    TouchableOpacity,
    TextInput, Image
} from 'react-native';
import { SearchBar } from 'react-native-elements';

export default function Searchbar({ value, updateSearch, style }) {

    const [query, setQuery] = useState();
    const [username, setUsername] = useState();
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
            updateSearch(text)
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