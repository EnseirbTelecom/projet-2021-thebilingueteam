import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from './Search'
import UserPage from './UserPage'

const Tab = createBottomTabNavigator();

class Home extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
            <Tab.Navigator>
              <Tab.Screen name="Search Page" component={Search} />
              <Tab.Screen name="User Page" component={UserPage} />
            </Tab.Navigator>
      </View>

    )
  }
}

export default Home