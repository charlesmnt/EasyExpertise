import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import { Button, Overlay, Icon, Input } from "react-native-elements";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import DropDownInsurance from "../components/DropDownInsurance";
import DropDownSinister from "../components/DropDownSinister";
import DropDownRooms from "../components/DropDownRooms";
import DeclarationDate from "../components/DeclarationDate";

import ipAdress from '../ipConfig'
import RoomsButtons from "./RoomsButtons";

import { connect } from "react-redux";

function NewFolderCreation(props) {
  const [visible, setVisible] = useState(false);
  const [advertVisible, setAdvertVisible] = useState(false);
  //Data from 1st and 2nd Input
  const [refFolder, setRefFolder] = useState("");
  const [nameInsured, setNameInsured] = useState("");
  //Data from children input
  const [insuranceID, setInsuranceID] = useState(null);
  const [claimDate, setClaimDate] = useState(null);
  const [claimType, setClaimType] = useState(null);
  const [rooms, setRooms] = useState([]);
  //Décla de Const pour le RDFlow

  const [idNewFolder, setIdNewFolder]=useState(idNewFolder);

  const toggleOverlay = () => {
    setVisible(!visible);
    if (advertVisible) {
      setAdvertVisible(false);
    }
  };

  const toggleAvertissement = () => {
    setAdvertVisible(!advertVisible);
  };

 
  var souvenirParentInsurance = (value, insuranceID) => {
    //console.log("insurance id souvenir parent", insuranceID)
    setInsuranceID(insuranceID);
  };

  var souvenirParentDate = (claimDate) => {
    //console.log(claimDate)
    setClaimDate(claimDate);
    // console.log(claimDate);
  };

 var souvenirParentSinister = (claimType) => {
   setClaimType(claimType);
    //console.log(claimType);
 };

  // var souvenirParentRooms = (rooms) => {
  //   setRooms(rooms);
  //   // console.log(rooms);
  // };

  var souvenirParentRoomsButtons = (rooms) => {
    setRooms(rooms);
    // console.log(rooms);
  };

  // useEffect( async () => {

  //   const test = props.token;
  //       //console.log("hello Token: "+test)           
  //   }
  // , [idNewFolder]);
  
  const gatherFolderData = async () => {
    //console.log("enregistrement en bdd " + insuranceID)

    var newFolder =   await fetch(`${ipAdress}/newFolder`, {
      

      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        "reference=" +
        refFolder +
        "&nameInsured=" +
        nameInsured +
        "&claimDate=" +
        claimDate +
        "&claimType=" +
        claimType +
        "&room=" +
        rooms +
        "&insuranceID=" +
        insuranceID +
        "&token="+
        props.token,
    });
    var response = await newFolder.json()
    
    //LA SOLUTION A MON PB CI-DESSOUS
    console.log("réponseID : "+ response.folderID._id)
    // ID OK ICI
    setIdNewFolder(response.folderID);
    // setIdNewFolder(response.folderID);
    console.log("vérif IDNEWFOLDER : "+idNewFolder)
    //console.log("insuranceid front --- " + insuranceID)

    props.onCreateFolderButton(
      // refFolder,
      // nameInsured,
      // insuranceID,
      // claimDate,
      // claimType,
      // rooms,
      response.folderID
    );
    
    toggleOverlay();
    props.navigation.navigate("FolderScreen");

    //console.log("-FOLDERID "+props.idFolder)

    // props.navigation.navigate("FolderScreen");
    // setRefFolder("");
    // setNameInsured("");
  };

  return (
    <View>
      {/* Bouton Nouveau Dossier de la Home */}
      <TouchableOpacity style={styles.button} onPress={() => toggleOverlay()}>
      <View style={styles.buttonView}>
          {/* icon={{
            name: "folder-plus",
            type: "font-awesome-5",
            size: 75,
            color: "white",
          }} */}
          <Icon name="folder-plus" type="font-awesome-5" size={75}  marginBottom= {-10} textAlign= "center" color="#1B1464"/>
        </View>
        <Text style={styles.buttonText}>NOUVEAU DOSSIER</Text>
      </TouchableOpacity>
      {/* Popup principale de création de dossier */}
      <Overlay
        isVisible={visible}
        onBackdropPress={() => setAdvertVisible(!advertVisible)}
        overlayStyle={{
          backgroundColor: "#1B1464",
          borderRadius: 10,
          width: "90%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconFontAwesome
          onPress={() => toggleAvertissement()}
          name="times-circle-o"
          size={30}
          color="white"
          style={{ marginBottom: 5, position: "absolute", top: 10, right: 10 }}
        />

        <Input
          containerStyle={styles.firstInput}
          inputStyle={{ marginLeft: 10, fontSize: 16 }}
          placeholder="Référence du dossier"
          onChangeText={(value) => setRefFolder(value)}
          value={refFolder}
        />
        <Input
          containerStyle={styles.whiteInput}
          inputStyle={{ marginLeft: 10, fontSize: 16 }}
          placeholder="Nom de l'assuré"
          onChangeText={(value) => setNameInsured(value)}
          value={nameInsured}
        />

<DropDownInsurance onPressParentInsurance={souvenirParentInsurance} />

<DeclarationDate style={{marginTop: 40}} onPressParentDate={souvenirParentDate} placeholder="Date du sinistre"/>

<DropDownSinister onPressParentSinister={souvenirParentSinister} />

{/* <DropDownRooms onPressParentRooms={souvenirParentRooms} /> */}

        <RoomsButtons onPressParentRoomsButtons={souvenirParentRoomsButtons}/>

        <Button
        
          onPress={() => {
            // LA FONCTION QUI ENREGISTRE LES DATA VERS BDD ET RÉPONDS L'ID DU NOUVEAU FOLDER
            gatherFolderData();
            
            // setIdNewFolder(idFolderFromBdd);
           
            setRefFolder("");
            setNameInsured("");
            // toggleOverlay();
            console.log("OK CREAT")
          }}
          // onPress={() => {//props.onCreateFolderButton(refFolder, nameInsured);
            
          //   //Récup des props transmises lors de l'appel du composant par son parent, lien vers le dossier,
          //   //mais attention peut-être besoin d'un await et de déplacer le lien ci-desosus
          //   //props.navigation.navigate("FolderScreen")
          // setRefFolder("");
          // setNameInsured("")
          // }}
          title="Créer le dossier"
          buttonStyle={{ backgroundColor: "#A3CB38", borderRadius: 50 }}
          containerStyle={{
            width: 200,
            heigth: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          type="solid"
          titleStyle={{ color: "black", marginHorizontal: 20 }}
        />
        {/* Sécurité : Message d'avertissement clic hors popup de creation */}
        <Overlay
          isVisible={advertVisible}
          onBackdropPress={() => setAdvertVisible(!advertVisible)}
          overlayStyle={{
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Êtes-vous sûr de vouloir quitter la création de dossier ?</Text>
          <Text>Les informations renseignées seront perdues.</Text>
          <Button
            onPress={() => setAdvertVisible(!advertVisible)}
            title="Continuer la création"
            buttonStyle={{ backgroundColor: "#A3CB38", borderRadius: 50 }}
            containerStyle={{
              width: 200,
              heigth: 200,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            titleStyle={{ color: "#1B1464", marginHorizontal: 20 }}
          />
          <Button
            onPress={() => setVisible(!visible)}
            title="Annuler ce dossier"
            containerStyle={{
              width: 200,
              heigth: 200,
              marginHorizontal: 50,
            }}
            titleStyle={{ color: "#ED4C67", marginHorizontal: 20 }}
            type="clear"
          />
        </Overlay>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  whiteInput: {
    marginBottom: 5,
    height: 60,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 15,
  },
  firstInput: {
    marginBottom: 5,
    height: 60,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 40,
  },
  //Ajustement de la dimension
  button: {
    paddingHorizontal: 8,
    paddingVertical: 15,
    borderRadius: 35,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginTop: "10%",
    width: 130,
    height: 120,
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

//export default NewFolderCreation;

function mapDispatchToProps(dispatch) {
  return {
    onCreateFolderButton: function (
      // refFolder,
      // nameInsured,
      // insurance,
      // claimDate,
      // claimType,
      // rooms,
      idNewFolder
    ) {

      dispatch({
        type: "createFolder",
        // reference: refFolder,
        // nameInsured,
        // insurance,
        // claimDate,
        // claimType,
        // rooms,
        idNewFolder
      });
    },
  };
}

function mapStateToProps(state) {
  return { token : state.userInfo.token }
 }  

export default connect(mapStateToProps, mapDispatchToProps)(NewFolderCreation);
