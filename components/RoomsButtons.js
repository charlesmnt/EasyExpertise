import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

import { Button, Overlay, Input } from "react-native-elements";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { connect } from "react-redux";

import InputComponent from "./InputComponent";

function RoomsButtons(props) {
  const [visible, setVisible] = useState(false);

  //Data from overlay
  // const [selectedRooms, setSelectedRooms] = useState([]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  //fonction appelée à chaque validation des pièces à expertiser - retour sur la liste de création de dossier
  const gatherRooms = () => {
    toggleOverlay();
  };
  
  const [data, setData] = useState([
    { label: "Entrée", value: "Entrée", iconName: "door-open", chosen: false},
    { label: "Couloir", value: "Couloir", iconName: "door-closed", chosen: false},
    { label: "Salon", value: "Salon", iconName: "sofa", chosen: false},
    { label: "Salle à manger", value: "Salle à manger", iconName: "bowl-mix", chosen: false},
    { label: "Chambre", value: "Chambre", iconName: "bed", chosen: false},
    { label: "Cuisine", value: "Cuisine", iconName: "fridge", chosen: false},
    { label: "Toilettes", value: "Toilettes", iconName: "toilet", chosen: false},
    { label: "Salle de bain", value: "Salle de bain", iconName: "shower", chosen: false},
    { label: "Bureau", value: "Bureau", iconName: "desktop-mac", chosen: false},
    { label: "Escaliers", value: "Escaliers", iconName: "stairs", chosen: false},
    { label: "Mezzanine", value: "Mezzanine", iconName: "layers-plus", chosen: false},
    { label: "Dressing", value: "Dressing", iconName: "hanger", chosen: false},
    { label: "Buanderie", value: "Buanderie", iconName: "washing-machine", chosen: false},
    { label: "Cellier", value: "Cellier", iconName: "archive", chosen: false},
    { label: "Grenier", value: "Grenier", iconName: "home-roof", chosen: false},
    { label: "Balcon", value: "Balcon", iconName: "brightness-4", chosen: false},
    { label: "Véranda", value: "Véranda", iconName: "leaf", chosen: false},
    { label: "Terrasse", value: "Terrasse", iconName: "grill", chosen: false},
    { label: "Sous-sol", value: "Sous-sol", iconName: "stairs-down", chosen: false},
    { label: "Cave", value: "Cave", iconName: "bat", chosen: false},
    { label: "Garage", value: "Garage", iconName: "garage-variant", chosen: false},
    { label: "Dépendance", value: "Dépendance", iconName: "home-variant", chosen: false},
    { label: "Façade", value: "Façade", iconName: "format-paint", chosen: false},
    { label: "Autre", value: "Autre", iconName: "tooltip-plus", chosen: false},
  ]);

  // ---ETAT DANS LEQUEL LES ROOMS AJOUTÉES SONT STOCKÉES
  const [selected, setSelected] = useState([]);
    console.log("--selected :");
    console.log(selected.length);

  // ---TRANSFORMATION DU TABLEAU SELECTED EN STRING LISIBLE
  const [readSelection, setReadSelection]= useState(selected.map((e)=> e+` / `)); 
  // var writeSelection = selected.map((e)=> e+` / `);
  // setReadSelection(writeSelection);

  // useEffect(()=> {
  //   console.log("SELCT ROOMS");
  //   console.log(selected);
  //   sendData(selected)
  // }, [selected])

  //-------------------------- FONCTION BOUTON PLUS -------------------------------
  var onPressPlus = (item, index) => {
    console.log('PLUS -- '+data[index].label);
    let dataCopy = data ;
    console.log(dataCopy[index].label)
    setData([...dataCopy], dataCopy[index].chosen = true)
    setReadSelection(selected.map((e)=> e+` / `));
  };

  //-------------------------- FONCTION BOUTON MOINS -------------------------------
  var selectedCopy = selected ;
  var dataCopy = data ;
  // var onPressMinus = (item, index) => {
  //   console.log('MOINS -- '+item.value);
    
  //   console.log("--COPY : "+selectedCopy);
  // };


  // --------------- MAP DE LA LISTE -----------------------------
  const buttonList = data.map((element, i) => {
    return (
      <View style={styles.buttonGroup} key={i}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log(element.value, i);
            setSelected([...selected, element.value]);
            // console.log(selected);
            onPressPlus(element, i);
          }}
        >
          <IconFontAwesome
            name="plus-circle"
            size={20}
            color="#1B1464"
            style={{ marginBottom: 5, position: "absolute", top: 3, left: 3 }}
          />
          <Icon
            name={element.iconName}
            size={30}
            marginBottom={5}
            textAlign="center"
            color="#1289A7"
          />
          <Text style={styles.buttonText}>{element.label}</Text>
        </TouchableOpacity>
          
        <TouchableOpacity
            onPress={() => {
              console.log(i);
              // onPressMinus(element, i);

              if(selected.length > 0 && selected.includes(element.value)){
                //-------- EN ATTENDANT DE REUSSIR A FAIRE FONCTIONNER LastIndexOf() ----------
                // selectedCopy = selected.splice((selected.lastIndexOf(element.value)), 1);
                // console.log(selectedCopy.lastIndexOf(element.value));
                selectedCopy = selected.filter ((e) => e != element.value)
          
                setSelected(selectedCopy);
                setReadSelection(selected.map((e)=> e+` / `));
                console.log("--vers FALSE : "+dataCopy[i].label)
              setData([...dataCopy], dataCopy[i].chosen = false)
                }
              // selectedCopy.splice(selectedCopy.lastIndexOf(item), 1)
          
              else if(selectedCopy.includes(element.value)){
                
              console.log("--vers TRUE : "+dataCopy[i].label)
              setData([...dataCopy], dataCopy[i].chosen = true)
              }else{
              console.log("--vers FALSE : "+dataCopy[i].label)
              setData([...dataCopy], dataCopy[i].chosen = false)
              }
              console.log("this is "+selected)
            }}>
              
          {/* {minusButtonToDisplay} */}
          <IconFontAwesome
            style={styles.buttonMinusIcon}
            name="minus-circle"
            //-----CHANGEMENT DE COULEUR SELON chosen
            color= {element.chosen ? "white" : "transparent"} 
            // {minusIsVisible}
            //   name="times-circle-o"
            //   color="#ED4C67"
            size={20}
          />

        </TouchableOpacity>
      </View>
    );
  });
//----- FIN DU MAP -------

  console.log("---selected.length");
  console.log(selected.length);

  //Pour le RDFlow
  var sendData = (selected) => {
    props.onPressParentRoomsButtons(selected);
    console.log("GOOOOOOO ROOOOOOOM");
    console.log(selected)
    console.log("----")
  };

  var listSelected = (selValue) => {
    console.log("Teste Liste Sel", selValue.toString())
    let listToExp = selValue.toString();
    return (
      // <TextInput value={selValue.toString()} editable={false} color="#fff" />
      listToExp
    )
  };
  // var changeIcon = (targetedItem) => {
  //   if(selected.includes(targetedItem)){
  //     setMinusIsVisible("transparent")
  //   }
  //   //const roomsArray = selected.split(",");
  //   //console.log(roomsArray);
  //   //console.log("--- dans roomsArray");
  //   console.log("T---" + targetedItem);


  //   //PEUT-ETRE A METTRE DANS LE BOUTON +
  //   if(selected.includes(targetedItem)){
  //     setMinusIsVisible(true)
  //     console.log("trouvé");
  //   } else {
  //     setMinusIsVisible(false)
  //     //   setMinusIcon({name:"minus-circle", color:"##1289A7"})
  //     console.log("mais t'es pas là!");
  //   }
  // };

  console.log("------SELECTED :");
  console.log(selected);
  //CELUI LA OK

  return (
    <View style={{ width: "90%" }}>
      {/* Bouton Nouveau Dossier de la Home */}
      <TouchableOpacity onPress={() => toggleOverlay()}>
        <Button
          title={"Pièces à expertiser : "}
          //containerStyle={styles.whiteInput}
          buttonStyle={{
            marginTop: 5,
            marginBottom: 5,
            height: 40,
            width: "100%",
            backgroundColor: "white",
            borderRadius: 15,
            justifyContent: "flex-start",
          }}
          titleStyle={{ color: "gray", marginLeft: 10, fontSize: 16 }}
          onPress={() => toggleOverlay()}

        />
        <Text style={{color:"#fff", marginLeft:20, marginBottom:20}}>{selected.map((e)=> e+` / `)}</Text>
      </TouchableOpacity>
      

      {/* Popup principale de création de dossier */}
      <Overlay
        isVisible={visible}
        onBackdropPress={() => toggleOverlay()}
        overlayStyle={{
          backgroundColor: "#1B1464",
          borderRadius: 10,
          width: "90%",
          alignItems: "center",
          justifyContent: "center",
          flex: 0.9,
        }}
      >
        <IconFontAwesome
          onPress={() => toggleOverlay()}
          name="times-circle-o"
          size={30}
          color="white"
          style={{ marginBottom: 5, position: "absolute", top: 10, right: 10 }}
        />
        {/* PARICI */}
        <ScrollView style={styles.scrollList}>
          <View style={styles.row}>{buttonList}</View>
        </ScrollView>
        <Text style={{color:"#fff", marginTop: 5}}>Pièces : {selected.map((e)=> e+` / `)}</Text>
        {/* <TextInput value={{selected}} editable={false} color="#fff" /> */}
        <Button
          onPress={() => {gatherRooms(); sendData(selected); console.log("Data Send"); console.log(selected)}}
          // onPress={() => {props.onCreateFolderButton(refFolder, nameInsured);
          //   toggleOverlay();
          //   //Récup des props transmises lors de l'appel du composant par son parent, lien vers le dossier,
          //   //mais attention peut-être besoin d'un await et de déplacer le lien ci-desosus
          //   props.navigation.navigate("FolderScreen");
          //   setRefFolder("");
          //   setNameInsured("");
          // }}
          title="Valider la liste"
          buttonStyle={{ backgroundColor: "#A3CB38", borderRadius: 50 }}
          containerStyle={{
            width: 200,
            heigth: 200,
            marginHorizontal: 50,
            marginVertical: 20,
          }}
          type="solid"
          titleStyle={{ color: "black", marginHorizontal: 20 }}
        />
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
  containerOverlay: {
    flex: 0.5,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    // paddingVertical: 10,
  },
  scrollList: {
    width: "95%",
    marginTop: 30,
  },
  buttonGroup: {
    // paddingHorizontal: 8,
    // paddingVertical: 15,

    alignSelf: "center",
    marginHorizontal: "1%",
    marginBottom: 5,
    minWidth: "27%",
    //maxWidth:"50%",
    textAlign: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonOnly: {
    width: 70,
    height: 70,
    backgroundColor: "#fff",
  },
  iconButton: {},
  buttonMinusIcon: {
    // width: "10%",
    alignSelf: "center",
    marginTop: 3,
    // marginBottom: 3
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignSelf: "center",
    marginTop: "10%",
    width: 80,
    height: 80,
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
    fontSize: 10,
  },
});

export default RoomsButtons;
