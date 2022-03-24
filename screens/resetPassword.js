import React, {useState} from 'react';
import {View, Image, Text} from 'react-native';
import {Input, Button}  from "react-native-elements";

import ipAdress from '../ipConfig'

function resetPassword(props) {

    const[userEmail, setUserEmail] = useState('')
    const[displayError, setDisplayError] = useState('')


    const sendEmail = async (email) => {
        const data = await fetch(`${ipAdress}/resetpassword`, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `emailFromFront=${email}`
          })
      
          const body = await data.json()

          if (body.response === true) {

            props.navigation.navigate('ConnectionScreen')
            setUserEmail('')
            setDisplayError('')
          } else if (body.response === false) {
            setDisplayError(body.error)
          }
    }

    var error = displayError;

return (
    <View style={{flex: 1}}>

        <View style={{flex: 1, justifyContent: 'center', alignItems:'center', marginBottom: 40, marginTop: 20}}>
        <Image style={{width: '40%'}} resizeMode='contain' source={require('../assets/logo-EasyExpertise.jpg')}/>
        </View>

    <View style={{flex: 3, justifyContent: "flex-start", alignItems: "center"}}> 
            <Input
                placeholder="Email"
                onChangeText={value => setUserEmail(value)}
                value={userEmail}
                style={{width: '70%'}}
            />
            <Text style={{marginBottom: 10, color:'red'}}>{error}</Text>
            <Button 
                buttonStyle={{backgroundColor: "#A3CB38", borderRadius: 30}}
                containerStyle={{textAlign: "center", width: "60%", marginBottom: 30}}
                title={"Réinitialiser mot de passe"} 
                onPress={() => {sendEmail(userEmail)}}
            /> 
    </View>

    </View>
)
}

export default resetPassword;