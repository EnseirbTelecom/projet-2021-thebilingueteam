import React, { useState, useEffect } from 'react';
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

export default function SearchBox({ value, updateSearch, style }) {

    const [query, setQuery] = useState();
    return (
        <View style={[styles.container, style]}>
            <View style={styles.searchContainer}>
                <View style={styles.vwSearch}>
                    <Image
                        style={styles.icSearch}
                        source={require('../img/magnGlass.png')} />
                </View>

                <TextInput  
                            value={query}
                            style={styles.inputText}
                            placeholder="Search user..."
                            placeholderTextColor="black"
                            //onChangeText={}
                            />
                {
                    query ?

                        <TouchableOpacity
                            onPress={() => setQuery('')}
                            style={styles.vwClear}>
                            <Image
                                style={styles.icClear}
                                source={require('../img/del.png')} />
                        </TouchableOpacity>
                        : <View style={styles.vwClear} />
}

            </View>
        </View >
    )
}
const styles = StyleSheet.create({

    icClear: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    
    textInput: {
        flex: 1,
    },

    vwSearch: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        // width: 40,
        // backgroundColor: 'red'
    },
    icSearch: {
        height: 18, width: 18
    },
    searchContainer:
    {
        backgroundColor: 'white',
        width: '90%',
        height: 40,
        flexDirection: 'row'

    },
    container: {
        height: 80,
        alignItems: 'center',
        // height: '100%', width: '100%' 
    },
});