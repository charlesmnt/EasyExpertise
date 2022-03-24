import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Divider, CheckBox } from "react-native-elements";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';

import List from "../components/List";
import SearchBar from "../components/SearchBar";
import Header from "../navigationContent/Header";
import ipAdress from "../ipConfig";

const AllFoldersScreen = (props) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState([]);
  const [chekedinsured, setChekedInsured] = useState(false);
  const [chekedinsurance, setChekedInsurance] = useState(false);
  const [chekedreference, setChekedReference] = useState(false);
  const [chekedstatus, setChekedStatus] = useState(false);
  const [value, setValue] = useState(null);
 
  const dataStatus = [{ value:'Terminé'},{value:'En cours'}, {value:'Facturé'},{value:'Reporté' }];

  // get data from the fake api endpoint
  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        `${ipAdress}/getMyFolders`
           );
      const data = await apiResponse.json();
      setFakeData(data.folders);
    };
    getData();
  }, []);
  //  console.log(fakeData)

  return (
    <View style={{ flex: 1 }}>
      <Header name="Mes dossiers" navigation={props.navigation} />
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      /> 
     
     <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={dataStatus}
        search
        maxHeight={200}
        labelField="value"
        valueField="value"
        placeholder="Etat du dossier"
        searchPlaceholder="Rechercher..."
        value={value}
        onChange={(item) => {   
          setValue(item.value);
        }}
         /> 
          
      {/* <View style={styles.item}>
        <Text style={styles.title}>Filtrez par :</Text>
        <View style={styles.checkbox}>
          <Text h4>Réference du dossier </Text>
          <CheckBox
            checkedColor={"#1B1464"}
            checked={chekedreference}
            onPress={() => setChekedReference(!chekedreference)}
          />

          <Text h4>Assurance</Text>
          <CheckBox
            checkedColor={"#1B1464"}
            checked={chekedinsurance}
            onPress={() => setChekedInsurance(!chekedinsurance)}
          />
        </View>
        <View style={styles.checkbox}>
          <Text h4>Nom de l'assuré</Text>
          <CheckBox
            checkedColor={"#1B1464"}
            checked={chekedinsured}
            onPress={() => setChekedInsured(!chekedinsured)}
          />

          <Text h4>Etat du dossier</Text>
          <CheckBox
            checkedColor={"#1B1464"}
            checked={chekedstatus}
            onPress={() => setChekedStatus(!chekedstatus)}
          />
        </View>
      </View> */}
      <View>
        {
          <List
            style={styles.list}
            searchPhrase={searchPhrase}
            data={fakeData}
            setClicked={setClicked}
            navigation={props.navigation}
            value={value}
          />
        }
      </View>
    </View>
  );
};

export default AllFoldersScreen;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  title: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  list: {
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 20,
    },
  dropdown: {
    marginLeft:20,
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
      alignItems:"center",
      height: 40,
      fontSize: 16,
     
    },
});
