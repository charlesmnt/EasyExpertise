import React, { useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";

import { Button, Overlay, Icon, Input } from 'react-native-elements';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';


export default function InputComponent (props) {

    return (

    <Input
            containerStyle={styles.whiteInput}
            inputStyle={{ marginLeft: 10 }}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChangeText}
            editable={props.editable}
            secureTextEntry={props.secureTextEntry}

    />
    
    )}

    const styles = StyleSheet.create({
        whiteInput:{
          marginBottom: 10, height:40, width: '90%', backgroundColor:"white", borderRadius: 15,
        },
  //      firstInput:{
    //      marginBottom: 5, height:60, width: '90%', backgroundColor:"white", borderRadius:15, marginTop:40
      //  },
      });