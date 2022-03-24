import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { Badge } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Dropdown } from 'react-native-element-dropdown';
import dateFormat from "./dateformat";

// definition of the Item, which will be rendered in the FlatList
const Item = (data) => {
  const [idfolder, setIdFolder] = useState("");

  var clickfolder = async (idfolder) => {
    setIdFolder(data.id);
    data.click(data.id);
    data.navigation.navigate("FolderScreen");
  };
  //  console.log(idfolder+": id folder")

  var statusColor = "";
  if (data.status == "Terminé") {
    statusColor = "success";
  }
  if (data.status == "En cours") {
    statusColor = "warning";
  }
  if (data.status == "Facturé") {
    statusColor = "primary";
  }
  if (data.status == "Reporté") {
    statusColor = "error";
  }
  var ref = data.reference;
  if (ref.length > 25) {
    ref = ref.slice(0, 25) + "...";
  }

  return (
    <View style={styles.item}>
      <Text style={styles.title}>Réf. : {ref}</Text>
      <Text style={styles.title}>Assurance : {data.insurance}</Text>
      <Text style={styles.details}>
        Date d'ouverture : {dateFormat(data.openingDate)}
      </Text>
      <Text style={styles.details}>
        Date de clôture : {dateFormat(data.closingDate)}
      </Text>
      <Text style={styles.details}>Nom de l'assuré : {data.nameInsured}</Text>
      <Badge
        containerStyle={{ bottom: 110, left: 130 }}
        status={statusColor}
        value={data.status}
      />
      <FontAwesome
        style={{ bottom: 80, left: 290, color: "#1B1464" }}
        onPress={() => {
          clickfolder(idfolder);
        }}
        name="pencil-square-o"
        size={30}
        color="black"
      />
        {/* <Button 
        title="Consulter"
        buttonStyle={{backgroundColor: "#A3CB38", borderRadius: 30, width: '50%'}}
        containerStyle={{width: "50%", height: 40, width: "100%",
        alignItems: "center", justifyContent:"center"}}
        onPress={() => {
          clickfolder(idfolder);
        }}
        /> */}
    </View>
  );
};

// the filter
const List = ({
  handleClickFolder,
  searchPhrase,
  setClicked,
  data,
  navigation,
  value
}) => {
  const renderItem = ({ item }) => {
     // filter of the status
if (searchPhrase === ""&&item.status==value) {
          return(
        <Item
        navigation={navigation}
        click={handleClickFolder}
        nameInsured={item.nameInsured}
        insurance={item.insuranceID.name}
        reference={item.reference}
        openingDate={item.openingDate}
        closingDate={item.closingDate}
        status={item.status}
        id={item._id}
        />
     );}  
     else   if (searchPhrase === "" && !value) { // when no input, show all
      return (
        <Item
          navigation={navigation}
          click={handleClickFolder}
          nameInsured={item.nameInsured}
          insurance={item.insuranceID.name}
          reference={item.reference}
          openingDate={item.openingDate}
          closingDate={item.closingDate}
          status={item.status}
          id={item._id}
        />
      );
    }  
  
    else if (// filter of the reference
      item.reference
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))&& !value
    ) {
        return (
        <Item
          navigation={navigation}
          click={handleClickFolder}
          nameInsured={item.nameInsured}
          insurance={item.insuranceID.name}
          reference={item.reference}
          openingDate={item.openingDate}
          closingDate={item.closingDate}
          status={item.status}
          id={item._id}
        />
      );
    } else if (// filter of the insurance
      item.insuranceID.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))&& !value
    ) {
      return (
        <Item
          navigation={navigation}
          click={handleClickFolder}
          nameInsured={item.nameInsured}
          insurance={item.insuranceID.name}
          reference={item.reference}
          openingDate={item.openingDate}
          closingDate={item.closingDate}
          status={item.status}
          id={item._id}
        />
      );
    } else if (// filter of the nameInsured
      item.nameInsured
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))&& !value
    ) {
      return (
        <Item
          navigation={navigation}
          click={handleClickFolder}
          nameInsured={item.nameInsured}
          insurance={item.insuranceID.name}
          reference={item.reference}
          openingDate={item.openingDate}
          closingDate={item.closingDate}
          status={item.status}
          id={item._id}
        />
      );
    }
  };
   
  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};
function mapDispatchToProps(dispatch) {
  return {
    handleClickFolder: function (idfolder) {
      dispatch({ type: "showfolder", idfolder: idfolder });
    },
  };
}
export default connect(null, mapDispatchToProps)(List);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  list__container: {
    margin: 5,
    height: "85%",
    width: "100%",
  },
  item: {
    marginLeft: 10,
    marginRight: 20,
    padding: 20,
    marginVertical: 8,
    borderColor: "#d6d6d6",
    backgroundColor: "#e8e8e8",
    height: 140,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 7,
    fontStyle: "italic",
  },
  // details: {
  //   marginLeft: 10,
  //   marginTop: 5,
  // },
});
