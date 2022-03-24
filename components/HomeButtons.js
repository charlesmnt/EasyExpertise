import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { Button, Overlay, Icon, Input } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

import NewFolderCreation from "./NewFolderCreation";

function HomeButtons(props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* N°1 MES DOSSIERS*/}

        <TouchableOpacity
          style={styles.button}
          //Besoin de récupérer la navigtion dans les props : reducer ?
          onPress={() => {
            props.navigation.navigate("AllFolderScreen");
          }}
        >
          <View style={styles.buttonView}>
              <AntDesign name="folderopen" size={75} style={styles.buttonIcon} />
            </View>
          <Text style={styles.buttonText}>MES DOSSIERS</Text>
        </TouchableOpacity>

        {/* N°2 CONTACTS*/}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("ContactsScreen");
          }}
        >
          <View style={styles.buttonView}>
              <FontAwesome name="address-book" size={75} style={styles.buttonIcon} />
            </View>
          <Text style={styles.buttonText}>MES CONTACTS</Text>
        </TouchableOpacity>

        {/* N°3 NOUVEUAU DOSSIER*/}

        <TouchableOpacity style={styles.button}>
          <NewFolderCreation navigation={props.navigation} />
        </TouchableOpacity>

        {/* N°4 FACTURES*/}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("InvoiceScreen");
          }}
        >
          <View style={styles.buttonView}>
            <AntDesign name="filetext1" size={75} style={styles.buttonIcon} />
          </View>

          <Text style={styles.buttonText}>MES FACTURES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 15,
    borderRadius: 35,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginTop: "3%",
    width: 130,
    height: 130,
    marginHorizontal: 1,
    //minWidth: "48%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonView: {
    marginVertical: 5,
    textAlign: "center",
  },
  buttonIcon: {
    color: "#1B1464",
  },
  buttonText: {
    textAlign: "center",
    color: "#1B1464",
  },
});

export default HomeButtons;
