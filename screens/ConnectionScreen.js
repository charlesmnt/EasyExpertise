import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Button, Input, Overlay, registerCustomIconType } from "react-native-elements";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Switch } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ipAdress from '../ipConfig'

function ConnectionScreen(props) {

    const [identifiant, setIdentifiant] = useState('')
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')
    const [createPassword, setCreatePassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [displayOverlay, setDisplayOverlay] = useState(false)
    const [displayError, setDisplayError] = useState('')
    const [displayEye, setDisplayEye] = useState(true)
    const [saveDataConnexion, setSaveDataConnexion] = useState(null)

    useEffect(() => {
        AsyncStorage.getItem("ConnexionData", function (error, data) {
            if (data !== null) {
                var ConnexionData = JSON.parse(data);
                setPassword(ConnexionData.password)
                setIdentifiant(ConnexionData.identifiant)
                if (ConnexionData.toggle !== null) {
                    setSaveDataConnexion(ConnexionData.toggle)
                    setDisplayEye(false)
                } else {
                    setSaveDataConnexion(false)
                }
            }
        })
    }, [])

    const signUp = async (email, createPassword, checkPassword, firstname, lastname) => {

        const data = await fetch(`${ipAdress}/signUp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `checkPasswordFromFront=${checkPassword}&emailFromFront=${email}&passwordFromFront=${createPassword}&firstnameFromFront=${firstname}&lastnameFromFront=${lastname}`
        })

        const body = await data.json()
        console.log(body.response)

        if (body.response === true) {

            props.connect(body.userSaved)
            props.navigation.navigate('MyDrawer', { screen: 'HomeScreen' })
            setDisplayOverlay(false);
            setCheckPassword('');
            setCreatePassword('');
            setFirstname('');
            setLastname('');
            setEmail('');
        } else if (body.response === false) {
            setDisplayError(body.error)
        }
    }


    const signIn = async (identifiant, password) => {
        const data = await fetch(`${ipAdress}/signIn`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `identifiantFromFront=${identifiant}&passwordFromFront=${password}`
        })

        const body = await data.json()
        if (body.response === true) {
            const token = body.user.token
            props.connect(body.user)
            setDisplayError('')
            setIdentifiant('')
            setPassword('')
            props.navigation.navigate('MyDrawer', { screen: 'HomeScreen' })
            if (saveDataConnexion) {
                AsyncStorage.setItem("ConnexionData",
                    JSON.stringify({ toggle: saveDataConnexion, identifiant: identifiant, password: password }))
            } else if (saveDataConnexion === false) {
                AsyncStorage.clear()
            }
        } else if (body.response === false) {
            setDisplayError(body.error)
        }

    }


    var eye;
    if (displayEye) {
        if (passwordVisible === false) {
            eye =
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <FontAwesome name="eye" size={30} color="black" />
                </TouchableOpacity>
        } else {
            eye =
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <FontAwesome name="eye-slash" size={30} color="black" />
                </TouchableOpacity>
        }
    } else {
        eye =
            <FontAwesome name="eye-slash" size={30} color="black" />
    }

    var error = displayError;

    return (
        <View style={{ flex: 1 }}>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 40, marginTop: 20 }}>
                <Image style={{ width: '40%' }} resizeMode='contain' source={require('../assets/logo-EasyExpertise.jpg')} />
            </View>

            <View style={{ flex: 3, justifyContent: "flex-start", alignItems: "center" }}>

                <View style={{ flex: 0, flexDirection: "row", width: "70%", justifyContent: "center" }}>
                    <Input
                        placeholder="Identifiant"
                        onChangeText={value => setIdentifiant(value)}
                        value={identifiant}
                    />
                    <AntDesign name="user" size={30} color="black" />
                </View>

                <View style={{ flex: 0, flexDirection: "row", width: "70%", justifyContent: "center", marginBottom: 30 }}>
                    <Input
                        placeholder="Mot de passe"
                        secureTextEntry={passwordVisible}
                        onChangeText={value => setPassword(value)}
                        value={password}
                    />
                    {eye}
                </View>

                <Text style={{ color: 'red', fontWeight: 'bold', marginBottom: 10 }}>{error}</Text>

                <Button
                    buttonStyle={{ backgroundColor: "#A3CB38", borderRadius: 30 }}
                    containerStyle={{ textAlign: "center", width: "60%", marginBottom: 30 }}
                    title={"Se connecter"}
                    onPress={() => { signIn(identifiant, password) }} />

                <TouchableOpacity style={{ marginBottom: 80 }} onPress={() => props.navigation.navigate('resetPassword')}>
                    <Text h6 style={{ textDecorationLine: 'underline' }}>J'ai oublié mon mot de passe</Text>
                </TouchableOpacity>

                <Text h6>Tu n'as pas de compte ?</Text>

                <TouchableOpacity onPress={() => setDisplayOverlay(true)}>
                    <Text style={{ fontWeight: "bold" }}>Créer un compte</Text>
                </TouchableOpacity>

                <Text style={{ marginTop: 20 }}>Sauvegarder votre identifiant et mot de passe</Text>
                <Switch
                    value={saveDataConnexion}
                    onValueChange={(value) => setSaveDataConnexion(value)}
                />

                <Overlay
                    isVisible={displayOverlay} onBackdropPress={() => { setDisplayOverlay(false); setDisplayError('') }}
                    overlayStyle={{
                        borderRadius: 10, alignItems: 'center', width: '90%',
                        justifyContent: 'center'
                    }}
                >
                    <Input
                        placeholder="Email"
                        onChangeText={value => setEmail(value)}
                        value={email}
                        containerStyle={styles.whiteInput}
                    />
                    <Input
                        placeholder="Mot de passe"
                        onChangeText={value => setCreatePassword(value)}
                        value={createPassword}
                        secureTextEntry={passwordVisible}
                        containerStyle={styles.whiteInput}
                    />
                    <Input
                        placeholder="Vérifier mot de passe"
                        onChangeText={value => setCheckPassword(value)}
                        value={checkPassword}
                        secureTextEntry={passwordVisible}
                        containerStyle={styles.whiteInput}
                    />
                    <Input
                        placeholder="Prénom"
                        onChangeText={value => setFirstname(value)}
                        value={firstname}
                        containerStyle={styles.whiteInput}
                    />
                    <Input
                        placeholder="Nom"
                        onChangeText={value => setLastname(value)}
                        value={lastname}
                        containerStyle={styles.whiteInput}
                    />
                    <Text style={{ color: "red", fontWeight: "bold", marginBottom: 10 }}>{error}</Text>
                    <Button
                        buttonStyle={{ backgroundColor: "#A3CB38", borderRadius: 30 }}
                        containerStyle={{ textAlign: "center", width: "60%", marginBottom: 30 }}
                        title={"Se connecter"}
                        onPress={() => { signUp(email, createPassword, checkPassword, firstname, lastname) }} />

                </Overlay>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    whiteInput: {
        marginTop: 5,
        height: 60,
        width: '70%',
        backgroundColor: "white",
        borderRadius: 15,
    }
});

function mapDispatchToProps(dispatch) {
    return {
        connect: function (userInfo) {
            dispatch({ type: 'connect', userInfo })
        }
    }
}

export default connect(null, mapDispatchToProps)(ConnectionScreen);
