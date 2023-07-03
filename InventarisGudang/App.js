import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from './src/screens/Login/LoginScreen'; 
import HomeScreen from './src/screens/Home/HomeScreen';
import StocksScreen from './src/screens/Stocks/StocksScreen';
import AddScreen from './src/screens/Add/AddScreen';
import TakeScreen from './src/screens/Take/TakeScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import DrawerContainer from './src/screens/DrawerContainer/DrawerContainer';

const Stack = createStackNavigator();

function MainNavigator() {
  return(
    <Stack.Navigator
      screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,
          }
      }}
    >
      <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Stocks' component={StocksScreen} />
      <Stack.Screen name='Add' component={AddScreen} />
      <Stack.Screen name='Take' component={TakeScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen}/>
    </Stack.Navigator>
  )
} 

const Drawer = createDrawerNavigator();

function DrawerStack() {
  return(
    <Drawer.Navigator
      drawerPosition='left'
      initialRouteName='Main'
      drawerStyle={{
        width: 250
      }}
      screenOptions={{headerShown: false}}
      drawerContent={({navigation})=> <DrawerContainer navigation={navigation}/>}
    >
      <Drawer.Screen name='Main' component={MainNavigator} />
    </Drawer.Navigator>
  )
} 

 export default function AppContainer() {
  return(
    <NavigationContainer>
      <DrawerStack/>
    </NavigationContainer>
  )
} 

console.disableYellowBox = true;