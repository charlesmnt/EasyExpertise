import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();


import 'react-native-gesture-handler';
import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ConnectionScreen from "./screens/ConnectionScreen";
import HomeScreen from './screens/HomeScreen';
import AllFoldersScreen from './screens/AllFoldersScreen';
import InvoiceScreen from './screens/InvoiceScreen';
import InvoiceDataScreen from './screens/InvoiceScreen';
import AccountScreen from './screens/AccountScreen';
import PasswordScreen from './screens/PasswordScreen';
import PhotoScreen from './screens/PhotoScreen';
import ContactsScreen from './screens/ContactsScreen';
import resetPassword from './screens/resetPassword';
import DrawerContent from './navigationContent/DrawerContent';
import FolderScreen from './screens/FolderScreen';
import FolderContentPicture from './components/FolderContentPicture';
import FolderContent from './components/FolderContent';

import HomeButtons from './components/HomeButtons';

import toggleMenu from './reducers/toogleMenu';
import userInfo from './reducers/userInfo';
import folderInfo from './reducers/folderInfo';
import picturesTab from './reducers/picturesTab';
import noteTab from './reducers/noteTab';

import {createStore, combineReducers}  from 'redux';
import { Provider } from 'react-redux'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const store = createStore(combineReducers({folderInfo, toggleMenu,  userInfo, picturesTab, noteTab}))


export default function App() {

  return (
    <Provider store={store}>
        <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="ConnectionScreen" component={ConnectionScreen} />
          <Stack.Screen name="MyDrawer" component={MyDrawer} />
          <Stack.Screen name="AccountScreen" component={AccountScreen} />
          <Stack.Screen name="ContactsScreen" component={ContactsScreen} />
          <Stack.Screen name="InvoiceDataScreen" component={InvoiceDataScreen} />
          <Stack.Screen name="InvoiceScreen" component={InvoiceScreen} />
          <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
          <Stack.Screen name="PhotoScreen" component={PhotoScreen} />
          <Stack.Screen name="AllFolderScreen" component={AllFoldersScreen} />
          <Stack.Screen name="FolderScreen" component={FolderScreen}/>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="resetPassword" component={resetPassword} />
          <Stack.Screen name="FolderContentPicture" component={FolderContentPicture} />
          <Stack.Screen name="FolderContent" component={FolderContent} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

const MyDrawer = () => {

  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>} 
    screenOptions={{gestureEnabled: false}} >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="AllFolderScreen" component={AllFoldersScreen} />
      <Drawer.Screen name="InvoiceScreen" component={InvoiceScreen} />
      <Drawer.Screen name="AccountScreen" component={AccountScreen} />
      <Drawer.Screen name="FolderScreen" component={FolderScreen} />
      <Drawer.Screen name="ContactsScreen" component={ContactsScreen} />
      <Drawer.Screen name="PasswordScreen" component={PasswordScreen} />

    </Drawer.Navigator>
    
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
