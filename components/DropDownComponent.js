import React, {useState, useEffect} from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { View, ScrollView, StyleSheet, Dimensions, } from 'react-native';
import { Badge, Text, Card, Button, CheckBox, Divider,Input, Overlay  } from 'react-native-elements';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

export default function DropDownComponent(props) {

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);



  useEffect( () =>{
    if (props.name){
      setValue(props.name)
      console.log("props.data", props.name)
    }
  } , []);

  var itemsToDisplay = [...props.data]

  var sendData = () => {props.onPressParent(value);}

    return (

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={itemsToDisplay}
        search
        maxHeight={200}
        labelField="value"
        valueField="value"
        placeholder="Type de sinistre"
        searchPlaceholder="Rechercher..."
        value={value}

        onChange={value => {
            console.log("value "+value.value)
          setValue(value.value);
          setIsFocus(false);


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
      marginTop: 40,
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
