import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { Badge, Text, Card, Button, CheckBox, Divider,Input, Overlay  } from 'react-native-elements';
import IconIonic from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import { useIsFocused } from '@react-navigation/native';

import Header from '../navigationContent/Header';

import DropDownSinister from '../components/DropDownSinister';
import DropDownRooms from '../components/DropDownRooms';
import DeclarationDate from '../components/DeclarationDate';
import InputComponent from '../components/InputComponent';
import DropDownInsurance from '../components/DropDownInsurance';
import dateFormat from '../components/dateformat';
import FolderContent from '../components/FolderContent';
import FolderContentPicture from '../components/FolderContentPicture';
import ipAdress from '../ipConfig'


function FolderScreen (props){
    //ETATS
    const [check1, setCheck1] = useState(false);
    const [folder, setFolder] = useState([])
    const [insurance, setInsurance] = useState([])
    const [roomsDisplay, setRoomsDisplay] = useState([])
    const [visible, setVisible] = useState(false);
    const [claimType, setClaimType] = useState(null)
    const [openingDate, setOpeningDate] = useState("")
    const [claimDate, setClaimDate] = useState("")
    const [nameInsured, setNameInsured]= useState("")
    const [phoneInsured, setPhoneInsured]= useState("")
    const [addressInsured, setAddressInsured] = useState("")
    const [expertiseDate, setExpertiseDate] = useState("")
    const [rooms, setRooms] = useState([])
    const [idfolder, setIDFolder]= useState(props.idFolder)
    const [closingDate, setClosingDate] = useState("")
    const [animating, setAnimating] = useState(true)
    // Etats selected

    const [claimSelected, setClaimSelected] = useState(null);

    const isFocused = useIsFocused();


    // tableau pour ensuite afficher les rooms
    var tabRooms = []


      var souvenirParentSinister = (claimType) => {
        setClaimType(claimType);
         console.log("claim type parent "+claimType);
      };

      var souvenirParentRooms = (rooms) => {
        setRooms(rooms);
        console.log(rooms);
      };
 
  var souvenirParentInsurance = (value, insuranceID) => {
      console.log("insurance from child "+value + insuranceID)
    setInsurance(value);
  };

  var souvenirParentClaimDate = (claimDate) => {
    console.log('souvenir parent claimDate '+claimDate)
    setClaimDate(claimDate);
    console.log(claimDate);
  };
  var souvenirParentExpDate = (expertiseDate) => {
    console.log('souvenir parent expertiseDate '+expertiseDate)
    setExpertiseDate(expertiseDate);
    console.log(expertiseDate);
  };

  var souvenirParentClosingDate = (closingDate) => {
    console.log('souvenir parent clotDate '+closingDate)
    setClosingDate(closingDate);
    console.log(closingDate);
  };

    useEffect(() => {
    if(props.idFolder){
        (async() => {
        var downloadPicture = await fetch(`${ipAdress}/${props.idFolder}`);

        var response = await downloadPicture.json()

        if(response.response === true) {
            props.picturesTab(response.folder.pictures)

        }
    })();
    }
    }, [props.idFolder])
    


//UseEffect d'initialisation : fetch pour récupérer le contenu du dossier grâge à l'ID 
var contenu =<ActivityIndicator size="large" color="#1B1464" animating={animating} />
    useEffect( async () => {

        setAnimating(true)

        const idDuFolder =props.idFolder
        //SEB EN COURS POUR INJECTER DATA DE NOUVEAUX FOLDER
        //     console.log("hello sunshine", test)
        // setIDFolder(props.idFolder)

            var loading = await fetch(`${ipAdress}/getInfoFolder`,
            {
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: `id=${idDuFolder}`
               }
              );
           
            
            var response = await loading.json()
        console.log(response.getFolder.closingDate+": reponse")
            
            // on set folder pour ensuite afficher les différentes informations sur la page
            setFolder(response.getFolder)
            setClaimType(response.getFolder.claimType)
            setOpeningDate(response.getFolder.openingDate)
            setClaimDate(response.getFolder.claimDate)
            setNameInsured(response.getFolder.nameInsured)
            setPhoneInsured(response.getFolder.phoneInsured)
            setAddressInsured(response.getFolder.adressInsured)
            setExpertiseDate(response.getFolder.expertiseDate)
            setClosingDate(response.getFolder.closingDate)
            setAnimating(false)
            

            // on set insurance pour afficher le nom de l'assurance dans les détails du dossier
            setInsurance(response.insurance)            
            // on set roomsDisplay pour afficher la liste des pièces 
            setRoomsDisplay(response.getFolder.room)

            var roomsToDisplay = response.getFolder.room
            roomsToDisplay = roomsToDisplay.map((room, i)=>{

                return (
                    tabRooms = tabRooms+ " " +room.roomExpertise
                    )
            })
            setRooms(tabRooms)
            if(props.idFolder){
                getInfoFolder()
            }
            
                    
        }
      , [props.idFolder]);

    // Couleur du badge
        var statusColor="";
        if(folder.status=="Terminé"){
        statusColor="success"
        }
        if(folder.status=="En cours"){
        statusColor="warning"
        };
        if(folder.status=="Facturé"){
            statusColor="primary"
        };
        if(folder.status=="Reporté"){
            statusColor="error"
        };

// Rendre visible l'overlay de modification des détails du dossier
      const toggleOverlay = () => {
        setVisible(!visible)}
      
// MAP pour afficher la liste des pièces dans les détails du dossier
    // var roomsToDisplay = roomsDisplay.map((room, i)=>{
    //   return ( <Text key={i} > {room.roomExpertise} </Text>)} )
      
// MAP pour créer les différentes sections par pièces dans la suite de la page      
    var encartToDisplay = roomsDisplay.map((room, i)=>{
         return (
             <View>
                    <View style={styles.checkbox}>
                        <FolderContent title={room.roomExpertise} navigation={props.navigation}/>
                    </View>
            </View> 
        )  })

  // Clic sur sauvegarder -  MAJ du dossier
 
  var clickSaveData = async() => {    
    const idDuFolder =props.idFolder

    var updateFolder =  await fetch(`${ipAdress}/save-folder`, {
        method: 'PUT',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `claimType=${claimType}&nameInsured=${nameInsured}&phoneInsured=${phoneInsured}&addressInsured=${addressInsured}&insurance=${insurance}&rooms=${rooms}&claimDate=${claimDate}&closingDate=${closingDate}&expertiseDate=${expertiseDate}&id=${idDuFolder}`
});
    var response = await updateFolder.json()

  }


    return (
        <View style={{flex: 1}} >
            
        <Header name="Mon dossier" navigation={props.navigation} />
      

    {/* ! Overlay de modification du dossier !*/}

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}  overlayStyle={{backgroundColor: "#1B1464", borderRadius: 10, width:"85%", height: "90%",
                alignItems: 'center',
                justifyContent: 'center', 
                
            }}>
                        <IconFontAwesome
                onPress={() => toggleOverlay()}
                name="times-circle-o"
                size={25}
                color="white"
                style={{ marginBottom: 5, position: "absolute", top: 10, right: 10 }}
                />
                <ScrollView style={styles.scrollList}>
                    <DropDownSinister claim={folder.claimType} onPressParentSinister={souvenirParentSinister}
                            />

                    <DropDownRooms room={roomsDisplay} onPressParentRooms={souvenirParentRooms}
                    />
                    
                        <Text style={styles.textInput}>Date du sinistre</Text>
                        <DeclarationDate onPressParentDate={souvenirParentClaimDate} date={claimDate} placeholder="Date du sinistre"/>
                   
                       
                        <Text style={styles.textInput}>Date d'expertise</Text>
                        <DeclarationDate onPressParentDate={souvenirParentExpDate} date={expertiseDate} placeholder="Date d'expertise"/>
                   
                        <Text style={styles.textInput}>Date de clôture</Text>
                        <DeclarationDate onPressParentDate={souvenirParentClosingDate} date={closingDate} placeholder="Date de clôture"/>
                    

                    <DropDownInsurance insurance={insurance} 
                    onPressParentInsurance={souvenirParentInsurance}/>

                    <InputComponent editable={true} placeholder="Nom assuré" value={nameInsured} onChangeText={(value) => setNameInsured(value)} />
                    <InputComponent editable={true} placeholder="Addresse" value={addressInsured} onChangeText={(value) => setAddressInsured(value)} />
                    <InputComponent editable={true} placeholder="Téléphone" value={phoneInsured} onChangeText={(value) => setPhoneInsured(value)} />
                    
                    </ScrollView>
                    <View style={{marginVertical: 15}}>
                        <Button 
                            title="Enregistrer les modifications"
                            onPress={()=>{clickSaveData() ; toggleOverlay()}}
                        />
                    </View>
                    
        </Overlay>
        {/*Fin overlay de modification du dossier*/}

        {/* Détails de la présentation du dossier */}

        <View style={styles.container}>
       
            <ScrollView>
            
            <View style={styles.header}>
                <Text h3 style={{ textAlign: 'center', marginVertical : 15 }}>Ref. {folder.reference}</Text>        
                          
            </View>
          
            <Card containerStyle={styles.card}>
                <View style={styles.titleCard}>
                    <Text style={{fontWeight: 'bold'}}>DETAILS DU DOSSIER :</Text>
                    {contenu}
                    <Badge style={styles.badge} value={folder.status} status={statusColor} />
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
                            onPress={toggleOverlay}
                            
                            >
                        </Button>
                        
                </View> 
                <Divider width={1} color={"#1B1464"} style={styles.divider} />
                    <View style={styles.details}> 
                                                
                        <View style={styles.details2}><Text style = {styles.titleTexteDetails}>Type de sinistre : </Text><Text> {claimType} </Text></View>
                        <View style={styles.details2}><Text style = {styles.titleTexteDetails}>Date de création : </Text><Text>{dateFormat(openingDate)} </Text></View>
                        <View style={styles.details2}><Text style = {styles.titleTexteDetails}>Date de sinistre : </Text><Text>{dateFormat(claimDate)}</Text></View>
                        <View style={styles.details2}><Text style = {styles.titleTexteDetails}>Date de l’expertise : </Text><Text> {dateFormat(expertiseDate)}</Text></View>
                        <View style={styles.details2}><Text style = {styles.titleTexteDetails}>Date de clôture : </Text><Text> {dateFormat(closingDate)}</Text></View>
                        <View style={styles.details2}><Text style = {styles.titleTexteDetails}>Assuré : </Text><Text> {nameInsured}</Text></View>
                        <View style={styles.details2}><Text style = {styles.titleTexteDetails}>Téléphone :  </Text><Text>{phoneInsured}</Text></View>
                        <View style={styles.details2}><Text style = {styles.titleTexteDetails}>Adresse : </Text><Text> {addressInsured}</Text></View>
                       
                        <View style={styles.details2}><Text style = {styles.titleTexteDetails}>Compagnie d’assurance :  </Text><Text>{insurance}</Text></View>
                        <View style={styles.details2}><Text style = {styles.titleTexteDetails}>Pièces à expertiser : </Text><Text> {rooms}</Text></View>
                       
                    </View>
                
                
            </Card>
            <View>
                
            </View>
                <View style={styles.checkbox}>
                    <FolderContent title={"Analyse du contrat"} navigation={props.navigation}/>
                </View>
                <Divider width={3} color={"#1B1464"} style={styles.divider} />
                {encartToDisplay}
                <Divider width={3} color={"#1B1464"} style={styles.divider} />
                <View style={styles.checkbox}>
                <FolderContent title={"Chiffrage"} navigation={props.navigation}/>
                </View>
                <View style={styles.checkbox}>
                    <FolderContent title={"Conclusion"} navigation={props.navigation}/>
                </View>
                <View style={styles.checkbox}>
                    <View style={{flex: 1, flexDirection: "row", width:"100%"}}>
                        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Vos photos</Text>
                        <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-end"}}>
                            <IconIonic
                                name="camera"
                                size={30}
                                color="#1B1464"
                                onPress={() => {props.navigation.navigate("PhotoScreen")}}
                            /> 
                            <IconIonic
                                name="images"
                                size={30}
                                color="#1B1464"
                                style={{marginLeft: 15}}
                                onPress={() => {props.navigation.navigate("FolderContentPicture")}}
                            />  
   
                        </View>   
                    </View>              
                        
                </View>
                
   
                </ScrollView> 
                <Button
       
                    title="Terminer"
                    buttonStyle={{ backgroundColor: '#A3CB38' , borderRadius: 50}}
                    containerStyle={{
                        width: 200,
                        heigth: 200,
                        alignSelf :"center",
                        marginVertical : 10
                    }}
                    type='solid'
                    titleStyle={{ color: 'white', marginHorizontal: 20 }}
                    //Seb: Lien de navigation à déterminer, ex. retour sur Home ou sur AllFolder ou rester sur le screen actuel
                    onPress={()=>props.navigation.navigate("HomeScreen")}
                    />
                
                   

        </View>
        
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      
    },
    details: {
        flexDirection: 'column',
        
    },
    details2:{
        flexDirection: "row"
    },
    titleTexteDetails:{
        fontWeight: 'bold'
    },
    card:{
        backgroundColor: "#e9e9e9",
        width: "100%",
        margin: 0
    },
    titleCard: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        margin :0
    },
    checkbox : {
        flexDirection : "row",
        justifyContent: 'space-between',
        alignItems:'center',
        width:  Dimensions.get('window').width/1.1,
        margin : 8,
        marginLeft:15
    },
    badge:{
        width:  Dimensions.get('window').width/1,
        
    },
    header: {  
        flexDirection: "row",
        alignItems:'center',
        justifyContent: 'center',


    },
    divider : {
        width:  Dimensions.get('window').width/1.2,
        alignSelf : "center",
        marginVertical : 5
    },
    textInput:{
        color: "white",
        margin: 0
    },
    scrollList: {
        width: "90%",
        marginTop: 25,
      },

  });
  
  function mapStateToProps(state) {
    return { idFolder: state.folderInfo }
   }  

   function mapDispatchToProps(dispatch) {
    return {
      picturesTab: function(pictureArray) {
          dispatch( {type: 'downloadPicture', pictureArray} )
      }
    }
   }
   export default connect(mapStateToProps, mapDispatchToProps)(FolderScreen);



