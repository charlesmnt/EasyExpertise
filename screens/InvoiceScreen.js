import React from "react";
import {Text, View, Button} from "react-native";
import Header from '../navigationContent/Header';

function InvoiceScreen(props) {

    return (
        <View style={{flex: 1}}>
        <Header name="Mes factures" navigation={props.navigation}/>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            
            <Text>Ecran Invoice</Text>
            <Button onPress={() => {props.navigation.navigate("HomeScreen" )}} title="Retour Home"></Button>

        </View>
        </View>

    )
}

export default InvoiceScreen;