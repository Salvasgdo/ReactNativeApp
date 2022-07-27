import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import  HomeNavigation from "./app/screens/HomeNavigation";
import Login from "./app/screens/Login";
import {createStackNavigator} from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, Button, Alert, AppState } from 'react-native';
import axios from "axios";

export default function App() {


  const Stack = createStackNavigator();
    return (
      <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{gestureEnabled: false}} >
          <Stack.Screen name="Login" component={Login} options={{headerShown: false, headerLeft: ()=> null}}/>
          <Stack.Screen name="Home" component={HomeNavigation} options={{headerShown: false }}  />
        </Stack.Navigator>
      </NavigationContainer>
      </SafeAreaProvider>

    );
}