import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from './Search'
import UserPage from './UserPage'
import HomePage from './HomePage'
import AddPic from './AddPic'

import { Provider } from 'react-redux'
import Store from '../Store/configureStore'

const Tab = createBottomTabNavigator();

class Home extends React.Component {

  render() {
    return (
      <Provider store={Store}>
        <View style={{ flex: 1 }} >
          <Tab.Navigator tabBarOptions={{ showLabel: false }}>
            <Tab.Screen name='Home' component={HomePage} options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="home" size={23} color="#fb5b5a" />) }} />
            <Tab.Screen name='Search' component={Search} options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="search-circle-sharp" size={25} color="#fb5b5a" />) }} />
            <Tab.Screen name='Add Post' component={AddPic} options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="add-circle" size={25} color="#fb5b5a" />) }} />
            <Tab.Screen name='My page' component={UserPage} options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="person-circle" size={25} color="#fb5b5a" />) }} />
          </Tab.Navigator>
        </View>
      </Provider>

    )
  }
}

export default Home