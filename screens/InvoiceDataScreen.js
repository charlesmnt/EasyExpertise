import React from "react";
import {Text, View} from "react-native";
import Header from '../navigationContent/Header';

function InvoiceDataScreen(props) {

    return (
        <View style={{flex: 1}}>
        <Header name="Facturation" navigation={props.navigation}/>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            
            <Text>Ecran InvoiceData</Text>
        </View>
        </View>

    )
}

export default InvoiceDataScreen;