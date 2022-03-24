import React, { useState } from 'react';
import {Text, View, StyleSheet} from "react-native";
import Header from '../navigationContent/Header';

import NewFolderCreation from '../components/NewFolderCreation';
import HomeButtons from '../components/HomeButtons';
import HomeAgenda from '../components/HomeAgenda';


function HomeScreen(props) {

    return (
        <View style={{flex: 1}}>
          <Header name="Accueil" navigation={props.navigation}/>
          <View style={styles.container}>
            {/* <NewFolderCreation />        */}
            <HomeButtons navigation={props.navigation}/>
          </View>
          <View style={{flex:4.5, flexDirection: 'row'}}>
            
            {/* <Text style={{ textAlign: "center" }}>Espace pour le Google Calendar</Text> */}
            <HomeAgenda/>
          </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 5,
      backgroundColor: '#fff',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });



export default HomeScreen;