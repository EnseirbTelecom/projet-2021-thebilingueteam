import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, RefreshControl, TouchableOpacity } from 'react-native';


function FriendProfile(props) {


    return (
        <View><Text>Friend Profile</Text>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={styles.followButton}
                    onPress={() => {
                        props.navigation.navigate('Search')
                    }}>
                    <Text style={styles.followText}>unFollow</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    followButton: {
        width: "100%",
        backgroundColor: "#fb5b5a",
        borderRadius: 10,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
    },
    followText: {
        color: "white",
    }
});

export default FriendProfile