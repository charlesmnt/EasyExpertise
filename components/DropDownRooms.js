import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { MultiSelect } from "react-native-element-dropdown";

export default function DropDownRooms(props) {
  const data = [
    { label: "Entrée", value: "Entrée" },
    { label: "Couloir", value: "Couloir" },
    { label: "Couloir (#2)", value: "Couloir (#2)" },
    { label: "Couloir (#3)", value: "Couloir (#3)" },
    { label: "Salon", value: "Salon" },
    { label: "Salle à manger", value: "Salle à manger" },
    { label: "Chambre", value: "Chambre" },
    { label: "Chambre (#2)", value: "Chambre (#2)" },
    { label: "Chambre (#3)", value: "Chambre (#3)" },
    { label: "Cuisine", value: "Cuisine" },
    { label: "Toilettes", value: "Toilettes" },
    { label: "Toilettes (#2)", value: "Toilettes (#2)" },
    { label: "Salle de bain", value: "Salle de bain" },
    { label: "Salle de bain (#2)", value: "Salle de bain (#2)" },
    { label: "Bureau", value: "Bureau" },
    { label: "Mezzanine", value: "Mezzanine" },
    { label: "Dressing", value: "Dressing" },
    { label: "Buanderie", value: "Buanderie" },
    { label: "Cellier", value: "Cellier" },
    { label: "Balcon", value: "Balcon" },
    { label: "Véranda", value: "Véranda" },
    { label: "Terrasse", value: "Terrasse" },
    { label: "Cave", value: "Cave" },
    { label: "Sous-sol", value: "Sous-sol" },
    { label: "Garage", value: "Garage" },
    { label: "Dépendance", value: "Dépendance" },
    { label: "Façade", value: "Façade" },
    { label: "Autre", value: "Autre" },
  ];
  //--Prévoir Amélioration réduire le nbr d'item afficher en même temps--
  // Etats
  const [selected, setSelected] = useState([]);
  // console.log(selected);

  // tableau pour ensuite afficher les rooms
  var tabRooms = [];

  // useEffect d'initialisation s'il y a des props et ajouter les pièces déjà sélectionnées
  useEffect(() => {
    if (props.room) {
      console.log(props.room.roomExpertise);
      var rooms = props.room;
      console.log("rooms", rooms);
      var roomsToDisplay = rooms.map((room, i) => {
        return (tabRooms = tabRooms + room.roomExpertise);
      });
      setSelected(tabRooms);
    }
    console.log('---selected')
    console.log(selected)
    sendData(selected);
  }, [selected]);

    //Pour le RDFlow
    var sendData = (selected) => {props.onPressParentRooms(selected);
    console.log("Go go go");
  };

  // function renderItem(item: any) {
  // function renderItem(item) {
    
  //   const [itemIcon, setItemIcon] = useState({
  //     name: "plus-circle",
  //     color: "#A3CB38",
  //   });

  //   return (
  //     <View style={styles.item}>
  //       {/* A faire : changer la couleur quand sélectionné */}
  //       <Text style={styles.selectedTextStyle}>{item.label}</Text>
  //       {/* <AntDesign style={styles.icon} color="black" name="Safety" size={20} /> */}
  //       <IconFontAwesome
  //         // style={styles.icon}
  //         // name="plus-circle"
  //         //color="#A3CB38"

  //         // name="times-circle"
  //         // color="#ED4C67"
  //         // changeIcon ={(item) => {

  //         //   }}

  //         // ---Mon code pour essayer de changer de couleur...
  //         // changeIcon ={ (targetedItem) => {
  //         //   const roomsArray = selected.split(",");
  //         //   console.log("--- dans roomsArray");
  //         //   if(roomsArray.includes(targetedItem)){
  //         //     setItemIcon({name:"times-circle", color:"#ED4C67"})
  //         //     console.log("trouvé");
  //         //   }else{
  //         //     setItemIcon({name:"plus-circle", color:"#A3CB38"})
  //         //     console.log("mais t'es pas là!")
  //         //   };
  //         // }}

  //         name={itemIcon.name}
  //         color={itemIcon.color}
  //         size={20}
  //         // color={iconColor}

  //         style={{ marginBottom: 5, position: "absolute", top: 10, right: 10 }}
  //       />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        // labelField="label"
        labelField="value"
        valueField="value"
        placeholder="Pièces à expertiser"
        value={selected}
        search
        searchPlaceholder="Rechercher..."
        maxHeight={200}
        onChange={(item) => {
          setSelected(item);
          sendData(item);
        }}
        renderRightIcon={() => (
          <IconFontAwesome
            name="chevron-circle-down"
            size={24}
            color="#1B1464"
          />
        )}
        //MASQUE RENDER
        // renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item.label}</Text>
              <IconFontAwesome
                // Ajout de la ligne ci-dessous, vérifier si utile pour style
                style={styles.textSelectedStyle}
                name="check-square-o"
                size={24}
                color="#A3CB38"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
  },
  dropdown: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 15,
    paddingLeft: 16,
    paddingRight: 16,
    //   shadowColor: '#000',
    //   shadowOffset: {
    //     width: 0,
    //     height: 1,
    //   },
    //   shadowOpacity: 0.2,
    //   shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#1289A7",
  },
  iconStyle: {
    width: 10,
    height: 10,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // Les badges
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 5,
    marginRight: 5,
    marginBottom: 10,
    paddingHorizontal: 5,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 2,
    fontSize: 16,
  },
});
