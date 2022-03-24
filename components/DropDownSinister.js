import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';


export default function DropDownSinister(props) {
// garder value mais suppr label
    const data = [
        { label: 'BDG', value: 'Bris de glace' },
        { label: 'Cbr', value: 'Cambriolage' },
        { label: 'CNat', value: 'Catastrophe naturelle' },
        { label: 'CTec', value: 'Catastrophe technologique' },
        { label: 'DDE', value: 'Dégât des eaux' },
        { label: 'Inc', value: 'Incendie' },
        { label: 'RC', value: 'Responsabilité civile' },
        { label: 'Sch', value: 'Sécheresse' },
        { label: 'Tpt', value: 'Tempête' },
        { label: 'Vdl', value: 'Vandalisme' },
        { label: 'Autre', value: 'Autre' }
      ];

    const [value, setValue] = useState(null);

  useEffect( () =>{
    if (props.claim){
      setValue(props.claim)  
      console.log(value)   
    };
    
  } , []);
  
 //Pour le RDFlow
  var sendData = (value) => {props.onPressParentSinister(value);
 // console.log("Go go go");
  }
  //console.log(value)   

    return (

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search
        maxHeight={200}
        // labelField="label"
        labelField="value"
        valueField="value"
        placeholder="Type de sinistre"
        searchPlaceholder="Rechercher..."
        value={value}

        onChange={item => {      //console.log("value"+value)   
        //console.log("item.value"+item.value)
          setValue(item.value);
          sendData(item.value)
        }}
        renderRightIcon={()=> (
            <IconFontAwesome
              name='chevron-circle-down'
              size={24}
              color="#1B1464"
            />
        )}
      />
    );
  };

  const styles = StyleSheet.create({
    dropdown: {
      width:"90%",
      marginBottom: 5,
      height: 40,
      backgroundColor: 'white',
      borderRadius: 15,
      paddingLeft: 16,
      paddingRight: 16,
    },
    placeholderStyle: {
       fontSize: 16,
       color: "gray",
    },
    selectedTextStyle: {
      fontSize: 16,
      color: "black"
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
    
  });