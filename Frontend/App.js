import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



import Navigation from './src/Navigation/Navigation'

const Stack = createStackNavigator(); //Initialize stack


export default class App extends React.Component {
  render() {
    return (
      <Navigation />
    )
  }
}