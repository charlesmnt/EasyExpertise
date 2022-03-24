import React, { useState, useEffect } from "react";
import { StyleSheet, Input, Text, View } from "react-native";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { Dropdown } from "react-native-element-dropdown";
import ipAdress from '../ipConfig'

export default function DropDownInsurance(props) {
  const [data, setData] = useState([]);
  //console.log(data);

  const [value, setValue] = useState(null);
  const [insuranceID, setInsuranceID] = useState(null);
  //console.log("---côté dropdown insurance :" + insuranceID);
  //Ne pas toucher à value pour LaureLine :)
  useEffect(() => {
    if (props.insurance) {
      setValue(props.insurance);
    }
    // sendData(value);
    // console.log(value);
  }, []);

  useEffect(() => {
    const getInsuranceList = async () => {
      const apiResponse = await fetch(
        `http://${ipAdress}:3000/getInsuranceList`
        
      );

      const dataList = await apiResponse.json();
      let insuranceList = [];
      dataList.insurances.map((item, i) =>
        insuranceList.push({ value: item.name, id: item._id })
      );
      setData(insuranceList);
    };
    getInsuranceList();
  }, []);

  //Pour le RDFlow
  var sendData = (value, insuranceID) => {
    //console.log("sendData "+value, insuranceID)
    props.onPressParentInsurance(value, insuranceID);
  };

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
      //remplacement de label par la value pour l'affichage dans la liste
      labelField="value"
      // valueField="value"
      valueField="value"
      placeholder="Assurance"
      searchPlaceholder="Rechercher..."
      value={value}
      onChange={(item) => {
        //console.log("item "+item.value)
        setValue(item.value);
        setInsuranceID(item.id);
        sendData(item.value,item.id)
      }}
      renderRightIcon={() => (
        <IconFontAwesome name="chevron-circle-down" size={24} color="#1B1464" />
      )}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    width: "90%",
    marginBottom: 5,
    height: 40,
    backgroundColor: "white",
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
    color: "black",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
