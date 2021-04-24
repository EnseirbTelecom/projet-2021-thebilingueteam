import 'react-native-gesture-handler';
import * as React from 'react';
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


const Stack = createStackNavigator(); //Initialize stack


class Navigation extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
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
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default Navigation