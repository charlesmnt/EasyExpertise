import React, {useState} from "react";
import {View, StyleSheet, Dimensions} from "react-native";
import Header from '../navigationContent/Header';
import {Text, Button, Image} from 'react-native-elements';
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ipAdress from '../ipConfig'
import {connect} from 'react-redux';
import { Root, Popup } from 'react-native-popup-confirm-toast';



import InputComponent from "../components/InputComponent";

import { useNavigation } from '@react-navigation/native';


function PasswordScreen(props) {
//go back navigation
    const navigation = useNavigation();

//Etats
    const [currentMDP, setCurrentMDP] = useState("")
    const [newMDP, setNewMDP] = useState("")
    const [newMDPConf, setNewMDPConf] = useState("")
    //const [isDisabled, setIsDisabled] = useState(true)

//Etats pour les yeux d'affichage des MDP
    const[displayEye1, setDisplayEye1] = useState(true)
    const[displayEye2, setDisplayEye2] = useState(true)
    const[displayEye3, setDisplayEye3] = useState(true)
    const [secure1, setSecure1] = useState(true)
    const [secure2, setSecure2] = useState(true)
    const [secure3, setSecure3] = useState(true)

var disabled = true
var error =""
if(newMDP === newMDPConf && newMDPConf!= " " && newMDP!= "" ){
    disabled = false
} else if (newMDP != newMDPConf && newMDPConf!= "" && newMDP!= "" ) {
error = "Attention, les mots de passe ne sont pas identiques"
}

var eye1=displayEye1 ? "eye-slash" : "eye"
var eye2=displayEye2 ? "eye-slash" : "eye"
var eye3= displayEye3 ? "eye-slash" : "eye"


var clickSaveData = async() => {    
    var token = props.userInfo.token
    console.log("click modif mdp", token,newMDP )

    var updateMDP =  await fetch(`${ipAdress}/update-mdp`, {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `currentMDP=${currentMDP}&newMDP=${newMDP}&token=${token}`
});
    var response = await updateMDP.json()
    console.log(response.modify)

    if (response.response){
        return (
        Popup.show({
            type: 'success',
            title: 'Bravo !',
            textBody: 'Votre mot de passe a bien été mis à jour',
            buttonText: 'Super',
            okButtonStyle: {backgroundColor: '#A3CB38'},
            callback: () => {Popup.hide() ; navigation.goBack()}
          }))
    } else {
        return (
            Popup.show({
                type: 'danger',
                title: 'Oh non !',
                textBody: 'Votre mot de passe actuel est erroné',
                buttonText: 'Recommencer',
                okButtonStyle: {backgroundColor: "#ED4C67"},
                callback: () => {Popup.hide()}
              })

        )
    }
  }


    return (
        <Root>
        <View style={{flex : 1, backgroundColor: "white"}} >
            <Header name="Mot de passe" navigation={props.navigation} />
           
            <View style={styles.ensemble} >         
                <IconFontAwesome onPress={() => {navigation.goBack()}} name="chevron-circle-left" size={24} color="#1B1464" /> 
                <Text style={{margin: 5}} >Retour</Text>
            </View>
            
            <View style={styles.colonne}>
                <View style={styles.ensemble}>
                    <Text>Mot de passe actuel</Text>
                    <View style={styles.ensEye} >
                    <InputComponent placeholder="*******" value={currentMDP} onChangeText={(value) => setCurrentMDP(value)} editable={true} secureTextEntry={secure1}/>
                    <TouchableOpacity onPress={() => {setSecure1(!secure1); setDisplayEye1(!displayEye1)}}>
                        <FontAwesome name={eye1} size={30} color="#1B1464" />
                    </TouchableOpacity>
                    
                    </View>
                   </View>
                <View style={styles.ensemble}>
                
                    <Text>Nouveau mot de passe</Text>
                    <View style={styles.ensEye} >
                        <InputComponent placeholder="***********" value={newMDP} onChangeText={(value) => setNewMDP(value)} editable={true} secureTextEntry={secure2}/>
                        <TouchableOpacity onPress={() => {setSecure2(!secure2); setDisplayEye2(!displayEye2)}}>
                        <FontAwesome name={eye2} size={30} color="#1B1464" />
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.ensemble}>
                    <Text>Confirmer le nouveau mot de passe</Text>
                    <View style={styles.ensEye} >
                        <InputComponent placeholder="Confirmer" value={newMDPConf} onChangeText={(value) => setNewMDPConf(value) } editable={true} secureTextEntry={secure3}/>
                        <TouchableOpacity onPress={() =>  {setSecure3(!secure3); setDisplayEye3(!displayEye3)}}>
                        <FontAwesome name={eye3} size={30} color="#1B1464" />
                    </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.erreur} >{error}</Text>
                <Button 
                    buttonStyle={{backgroundColor: "#A3CB38", borderRadius: 30}}
                    containerStyle={{textAlign: "center", width: "60%", marginBottom: 30}}
                    title="Enregistrer"
                    disabled={disabled}
                    onPress={() =>
                        clickSaveData()}
                    />

            </View>
        
        </View>
        </Root> 
        

    )
}


const styles = StyleSheet.create({
    container :{
        backgroundColor: "white"
    },
    colonne: {
        flex: 1,
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop : 40
        
    },
    ensemble: {
        flexDirection : "row",
        width:  Dimensions.get('window').width/1.3,
        flexWrap: "wrap",
        marginTop: 15,
        marginLeft: 15,
        alignItems: 'center', 
    },
    title:{
        fontWeight: 'bold',
        
    },
    ensEye:{
        flexDirection: "row"
    },
    erreur:{
        color: "red",
        margin : 15
    }
})


function mapStateToProps(state) {
    return { userInfo: state.userInfo}
   }  
   export default connect(mapStateToProps, null)(PasswordScreen);
