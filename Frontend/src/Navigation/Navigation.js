import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';

import SignIn from '../Components/SignIn'
import SignUp from '../Components/SignUp'
import Home from '../Components/Home'
import EditProfile from '../Components/EditProfile';
import FriendProfile from '../Components/FriendProfile';


const Stack = createStackNavigator(); //Initialize stack


function Navigation(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='SignIn'>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
                headerShown: false
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
                headerShown: false
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: 'white',
                },
                headerTintColor: '#fb5b5a',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: 'white',
                },
                headerTintColor: '#fb5b5a',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
            }}
          />
          <Stack.Screen
            name="FriendProfile"
            component={FriendProfile}
            options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: 'white',
                },
                headerTintColor: '#fb5b5a',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  
}

export default Navigation