import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'


import Navigation from './Navigation/Navigation'

const Stack = createStackNavigator(); //Initialize stack


export default class App extends React.Component {
  render() {
    return (
       <Provider store={Store}>
           <Navigation />
       </Provider>
    )
  }
}
