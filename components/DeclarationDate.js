import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Input } from 'react-native-elements';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import dateFormat from '../components/dateformat';

import DatePicker from 'react-native-neat-date-picker'

export default function DeclarationDate(props) {

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [pickedDate, setPickedDate] = useState('')
  const [declaredDate, setDeclaredDate] = useState(new Date())
  const [value, setValue] = useState(null);


 
  //BONUS important
  //Quand change de composant, vérifier si bien date
  //
  //et
  //setDeclaredDate(pickedDate)

  // if(declaredDate){
  //   console.log(new Date(declaredDate.split('/').reverse().join('-')));
  // };
  
  useEffect( () =>{
    if (props.date){
      setPickedDate(dateFormat(props.date))  
      console.log(value)   
    };
  } , []);
  
  //Pour le RDFlow
 var sendData = (declaredDate) => {props.onPressParentDate(declaredDate);
  console.log('declaredate dans sendData'+ declaredDate)
  //console.log("Go go go");
  }

  return (
      <View style={{width:'90%'}}>
        <TouchableOpacity
          onPress={ ()=> setShowDatePicker(true)}
          >
          <Input
          keyboardType= "numeric"
            containerStyle={styles.whiteInput}
            inputStyle={{ marginLeft: 10, fontSize: 16}}
            placeholder={props.placeholder}
            //placer une sécurité au cas où la date entrée manuellement n'a pas le bon format
            onChangeText={(value) => setPickedDate(value)}
            value={pickedDate}
            rightIcon={
              <IconFontAwesome
                name='calendar-o'
                size={24}
                color="#1B1464"
              />
            }
          />
         </TouchableOpacity> 

      <DatePicker
        isVisible={showDatePicker}
        mode={'single'}
        onCancel={()=>setShowDatePicker(false)}
        onConfirm={(date) => {
          
          setShowDatePicker(false);
          setPickedDate(date.dateString.split(`-`).reverse().join(`/`));
          setDeclaredDate(new Date(date.dateString));
          sendData(new Date(date.dateString))
        }}
        colorOptions={{
            headerColor:"#1B1464",
            changeYearModalColor:"#1B1464",
            weekDaysColor:"#1289A7",
            selectedDateBackgroundColor:"#1289A7",
            confirmButtonColor:"#1289A7"
        }}	

      />
    </View>
)};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    whiteInput:{
      marginTop: 0, marginBottom: 10, height:60, backgroundColor:"white", borderRadius: 15,
    },
  });