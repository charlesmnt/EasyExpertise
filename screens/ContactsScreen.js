import React from "react";
import { useState, useEffect } from "react";
import Header from "../navigationContent/Header";
import {
  SafeAreaView,
  Alert,
  Modal,
  Text,
  TextInput,
  Button,
  View,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import ipAdress from "../ipConfig";
import SearchBar from "../components/SearchBar";
import DropDownInsurance from "../components/DropDownInsurance";

function ContactsScreen(props) {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [datacontacts, setDataContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [response, setResponse] = useState([]);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [insurance, setInsurance] = useState("");
  const [title, setTitle] = useState("");
  const [action, setAction] = useState("");
  const [insurance1, setInsurance1] = useState([])

  const getData = async () => {
    const apiResponse = await fetch(`${ipAdress}/getMyContacts`);
    const data = await apiResponse.json();
    setDataContacts(data.contacts);
  };
  useEffect(() => {
    getData();
  }, []);
  // console.log(datacontacts+"datacontacts");
  var souvenirParentInsurance = (value, insuranceID) => {
      setInsurance1(value);
};
  const Item = (props) => {
    const id = props.id;
    var deletecontact = async () => {
      //   console.log(id)

      const deleteReq = await fetch(`${ipAdress}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${id}`,
      });
      const dataCopy = [...datacontacts];
      setDataContacts(dataCopy.filter((object) => object.id != id));
      getData();
    };
    const buttonAlert = () =>
      Alert.alert(
        "Supprimer un contact",
        "Êtes-vous sûr de vouloir de vouloir supprimer ce contact !!!",
        [
          {
            text: "Annuler",
            onPress: () => datacontacts, //console.log("Cancel Pressed")
            style: "cancel",
          },
          { text: "OK", onPress: () => deletecontact() }, //console.log("OK Pressed")
        ]
      );
    var editecontact = async () => {
      // console.log (id)
      const getReq = await fetch(`${ipAdress}/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${id}`,
      });
      const res = await getReq.json();

      setModalVisible(true);
      setTitle("Modifier le contact");
      setAction("Modifier");
      setPhone(res.returDb.contactPhone);
      setName(res.returDb.contactName);
      setAddress(res.returDb.contactAddress);
      setEmail(res.returDb.contactEmail);
      setInsurance(res.returDb.insuranceID.name);
      setResponse(res.returDb);
    };

    return (
      <View style={styles.item}>
        <View style={styles.detail}>
          <Text style={styles.title}>Nom : </Text>
          <Text>{props.contactName}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.title}>Numéro de tél : </Text>
          <Text>{props.contactPhone}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.title}>Email : </Text>
          <Text>{props.contactEmail}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.title}>Adresse : </Text>
          <Text>{props.contactAddress}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.title}>Assurance : </Text>
          <Text>{props.contactInsuranceName}</Text>
        </View>
        
        <FontAwesome
          style={{ top: 35, color: "#1B1464" }}
          onPress={() => {
            editecontact(props.id);
          }}
          name="pencil-square-o"
          size={30}
          color="black"
        />
        <FontAwesome
          style={{ left: 280, color: "#1B1464" }}
          onPress={() => {
            buttonAlert();
          }}
          name="trash-o"
          size={30}
          color="black"
        />
      </View>
    );
  };

  const renderItem = ({ item }) => {
    //  voir tous les contacts(input recherche vide)
    if (searchPhrase === "") {
      return (
        <Item
          editercontact={item.editecontact}
          deleteTodb={item.deletecontact}
          id={item._id}
          contactAddress={item.contactAddress}
          contactName={item.contactName}
          contactPhone={item.contactPhone}
          contactEmail={item.contactEmail}
          contactInsuranceName={item.insurance}
        />
      );
    }
    // filtre par assurance
    if (
      item.insuranceID.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Item
          contactName={item.contactName}
          contactPhone={item.contactPhone}
          id={item._id}
          contactEmail={item.contactEmail}
          contactInsuranceName={item.insurance}
        />
      );
    }
    // filtre par Nom
    if (
      item.contactName
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Item
          contactName={item.contactName}
          contactPhone={item.contactPhone}
          id={item._id}
          contactEmail={item.contactEmail}
          contactInsuranceName={item.insurance}
        />
      );
    }
  };

  // Modifier/MAJ un contact
  var updateContact = async () => {
    setModalVisible(!modalVisible);
    var contactUpdated = await fetch(`${ipAdress}/updatecontact`, {
      method: "PUT",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id=${response._id}&phone=${phone}&name=${name}&insurance=${insurance}&address=${address}&email=${email}`,
    });
    var responseUpdate = await contactUpdated.json();
    setModalVisible(!modalVisible);
    getData();
  };

  // Ajouter un nouveau contact
  var newContact = async () => {
    var contactCreated = await fetch(`${ipAdress}/newcontact`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `phone=${phone}&name=${name}&insurance=${insurance}&address=${address}&email=${email}`,
    });

    var responseNew = await contactCreated.json();
    var copyData = [...datacontacts];
    setDataContacts(copyData.push(responseNew));
    setModalVisible(!modalVisible);
    getData();
  };
  var newForm = async () => {
    setModalVisible(true);
    setResponse([]);
    setTitle("Ajouter un nouveau contact");
    setAction("Enregister");
    setPhone("");
    setName("");
    setAddress("");
    setEmail("");
    setInsurance1("");
  };
  

  return (
    <View style={{ flex: 1 }}>
      <Header name="Mes contacts" navigation={props.navigation} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />

        <SafeAreaView style={styles.container}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={datacontacts}
            renderItem={renderItem}
          />

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.title1}>{title}</Text>
                  <View style={styles.detail}>
                    <Text style={styles.title}>Nom : </Text>
                    <TextInput
                      style={styles.input}
                      autoFocus
                      onChangeText={(name) => setName(name)}
                      defaultValue={response.contactName}
                      value={name}
                    />
                  </View>
                  <View style={styles.detail}>
                    <Text style={styles.title}>Numéro de tél : </Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(phone) => setPhone(phone)}
                      defaultValue={response.contactPhone}
                      value={phone}
                    />
                  </View>
                  <View style={styles.detail}>
                    <Text style={styles.title}>Email : </Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(email) => setEmail(email)}
                      defaultValue={response.contactEmail}
                      value={email}
                    />
                  </View>
                  <View style={styles.detail}>
                    <Text style={styles.title}>Adresse : </Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(address) => setAddress(address)}
                      defaultValue={response.contactAddress}
                      value={address}
                    />
                  </View>
                  <View style={styles.detail}>
                  <Text style={styles.title}>Assurance : </Text>
                  <DropDownInsurance 
                  style={{width:20}}
                  defaultValue={response.contactInsuranceName} 
                  insurance1={insurance1} 
                  onPressParentInsurance={souvenirParentInsurance}/>
                    {/* <TextInput
                      
                      onChangeText={(insurance) => setInsurance(insurance)}
                      defaultValue={response.contactInsuranceName}
                      value={insurance}
                    /> */}
                  
                    
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={(action) => {
                        if (action !== "Modifier") {
                          newContact();
                        }
                            }}
                    >
                      <Text style={styles.textStyle}>{action}</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Annuler</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </SafeAreaView>
        <View>
          <FontAwesome5
            style={{ bottom: 5, color: "#1B1464" }}
            onPress={() => {
              newForm();
            }}
            name="user-plus"
            size={30}
            color="black"
          />
        </View>
        {/* <Button onPress={() => {props.navigation.navigate("HomeScreen" )}} title="Retour Home"></Button> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
  },
  item: {
    backgroundColor: "#e8e8e8",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 0,
    margin: 5,
  },
  detail: {
    flexDirection: "row",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  title1: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#ff4d4d",
  },
  centeredView: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    marginBottom: 22,
  },
  modalView: {
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
  },
  dropdown: {
    width: "10%",
    marginBottom: 5,
    height: 40,
    backgroundColor: "white",
    borderRadius: 15,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default ContactsScreen;
