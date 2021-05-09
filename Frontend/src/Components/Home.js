import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

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
              <View style={{flex: 1}}>
                    <Tab.Navigator>
                      <Tab.Screen name="Search Page" component={Search} />
                      <Tab.Screen name="Home Page" component={HomePage} />
                      <Tab.Screen name="AddPic Page" component={AddPic} />
                      <Tab.Screen name="User Page" component={UserPage} />
                    </Tab.Navigator>
              </View>
        </Provider>

    )
  }
}

export default Home