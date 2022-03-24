import React, {useState, useEffect} from "react";
import {View, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from "react-native";
import {Text, Button} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


import InputComponent from "../components/InputComponent";
import Header from '../navigationContent/Header';
import IconIonic from 'react-native-vector-icons/Ionicons';
import ipAdress from '../ipConfig'


import {connect} from 'react-redux';
//import { styles } from "react-native-element-dropdown/src/TextInput/styles";


function AccountScreen(props) {

    //ETATS
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail ] = useState("")
    const [phone, setPhone] = useState("")
    const [disabled , setDisabled] = useState(true)
    const [editable, setEditable] = useState(false)    
    const [isVisible, setIsVisible] = useState(false)
    const [siret, setSiret] = useState("")
    const [address, setAddress] = useState("")

    //USEEFFECT D'INITIALISATION
    useEffect( async () => {
        console.log('coucou')
        console.log(props.userInfo)
        setLastname(props.userInfo.lastname)
        setFirstname(props.userInfo.firstname)
        setPhone(props.userInfo.phone)
        setEmail(props.userInfo.email)
        setSiret(props.userInfo.siret)
        setAddress(props.userInfo.address)
    }, [])

// ENVOI DES MODIFICATIONS EN BDD

    const saveInfoUser = async () => {
        var token = props.userInfo.token
        console.log('saveInfoUser')

        var updateUser =  await fetch(`${ipAdress}/update-userinfo`, {
        method: 'PUT',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `token=${token}&firstname=${firstname}&lastname=${lastname}&email=${email}&phone=${phone}&siret=${siret}`
});
    var response = await updateUser.json()
    //console.log(response)
    //Envoi des modifications vers le reducer :
    props.majDetails(lastname, firstname, email, phone, address, siret)
    }


var saveButtonToDisplay ;
    if(isVisible){
        saveButtonToDisplay = <Button onPress={() => {setEditable(!editable); saveInfoUser(); setIsVisible(!isVisible)}} title="Enregistrer les modifications" style={{margin : 25}} ></Button>
    }


    return (
        <KeyboardAwareScrollView style={styles.container}>

    
        <View >
        <Header name="Mon compte" navigation={props.navigation}/>
        <View style={styles.colonne}>
            <View style={styles.ensembletitle}>
                <Text h4 style={styles.title} >Détails de mon compte</Text>
                <Button
                        icon={
                            <IconIonic
                            name="pencil-outline"
                            size={20}
                            color="#1B1464"
                            />
                            }
                            buttonStyle={{ backgroundColor: "transparent" }}
                            type="solid"
                            onPress={() => {setEditable(!editable); saveInfoUser(); setIsVisible(!isVisible)}} 
                            >
                </Button>
            </View>
            <View style={styles.ensemble}>
            
            <InputComponent placeholder="Prénom" value={firstname} onChangeText={(value) => setFirstname(value)} editable={editable} autoFocus={true}/>
            
            </View>
            <View style={styles.ensemble}>
            {/* <Text style={styles.text}>Nom</Text> */}
            <InputComponent placeholder="Nom" value={lastname} onChangeText={(value) => setLastname(value)} editable={editable}/>
            </View>
            <View style={styles.ensemble}>
            {/* <Text style={styles.text}>Email</Text> */}
            <InputComponent placeholder="Email" value={email} onChangeText={(value) => setEmail(value)} editable={editable} style={{border : 2}} />
            </View>
            <View style={styles.ensemble}>
          {/*   <Text style={styles.text}>Téléphone</Text> */}
            <InputComponent placeholder="Téléphone" value={phone} onChangeText={(value) => setPhone(value)} editable={editable}/>
            </View>
            <Text h5 style={styles.subtitle} >Siret</Text>
            <View style={styles.ensemble}>
            <InputComponent placeholder="Siret" value={siret} onChangeText={(value) => setSiret(value)} editable={editable}/>
            </View>
            <Text h5 style={styles.subtitle} >Adresse de facturation</Text>
            <View style={styles.ensemble}>
            <InputComponent placeholder="Adresse" value={address} onChangeText={(value) => setAddress(value)} editable={editable}/>
            </View>
           <View style={{margin:15}} >{saveButtonToDisplay}</View>
            


            <Button style={{margin : 55}} type="outline" onPress={() => {props.navigation.navigate("PasswordScreen",{navigation: props.navigate})}} title="Modifier mon mot de passe"></Button>

        </View>
        </View>
        </KeyboardAwareScrollView>


    )
}

const styles = StyleSheet.create({
    container :{
        flex: 1,
        backgroundColor: "white"
    },
    colonne: {
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        
    },
    ensemble: {
        flexDirection : "row",
        width:  Dimensions.get('window').width/1.3,
        flexWrap: "wrap",
        justifyContent: "center",
        marginVertical: 5,
        
    },
    subtitle:{
        marginTop: 15,
        fontWeight: 'bold',
        color : '#1B1464',   
    },
    title:{
        fontWeight: 'bold',
        color : '#1B1464',      
    },
    ensembletitle:{
        marginVertical:15,
        flexDirection: "row",     
    },
    text:{
        marginBottom : 10,
        color : '#1B1464',
    }
})


function mapDispatchToProps(dispatch) {
    return {
        majDetails: function(lastname, firstname, email, phone, address, siret) {
          dispatch( {type: 'majDetails', lastname, firstname, email, phone, address, siret} )
      }
    }
   }

function mapStateToProps(state) {
    return { userInfo: state.userInfo }
   }
    
   export default connect(
    mapStateToProps,
    mapDispatchToProps
   )(AccountScreen);

