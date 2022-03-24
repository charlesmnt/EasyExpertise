import React, {useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Drawer } from 'react-native-paper';
import { DrawerItem } from '@react-navigation/drawer';
import { Header as HeaderRNE } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';



function DrawerContent(props) {

    const[focused, setFocused] = useState('')

    const changeFocused = (label) => {
        setFocused(label)
    }


    if(props.toggleMenu === true) {
        props.navigation.openDrawer()
    } else if (props.toggleMenu === false) {
        props.navigation.closeDrawer()
    }
    return(
        <View style={styles.scrollSection} {...props}>
        <HeaderRNE
        containerStyle={{backgroundColor: '#1B1464'}}
        rightComponent={
            <View style={{backgroundColor: '#1B1464'}}>
                <TouchableOpacity
                onPress={() => props.closeMenu(false)}>
                <AntDesign name="arrowleft" size={20} color="white" />
                </TouchableOpacity>
            </View>
        }

      />
        
                    <Drawer.Section style={styles.drawerSectionTop}>
                            <DrawerItem 
                                icon={() => (
                                    <AntDesign 
                                    name="home" 
                                    color={'white'}
                                    size={30}
                                    />
                                )}
                                label="HOME"
                                labelStyle={{color : 'white', fontSize:14}}
                                style={{marginBottom : 15}}
                                activeTintColor='red'
                                focused={focused === 'home' ? true : false}
                                onPress={() => {changeFocused('home'); props.closeMenu(false); props.navigation.navigate('MyDrawer', {screen : "HomeScreen"})}}
                            />
                            <DrawerItem 
                                icon={() => (
                                    <AntDesign 
                                    name="folderopen" 
                                    color={'white'}
                                    size={30}
                                    />
                                )}
                                label="MES DOSSIERS"
                                labelStyle={{color : 'white', fontSize:14}}
                                style={{marginBottom : 15}}
                                activeTintColor='red'
                                focused={focused === 'mesdossiers' ? true : false}
                                onPress={() => {changeFocused('mesdossiers'); props.closeMenu(false); props.navigation.navigate('MyDrawer', {screen : "AllFolderScreen"})}}
                            />
                            <DrawerItem 
                                icon={() => (
                                    <AntDesign 
                                    name="filetext1" 
                                    color={'white'}
                                    size={30}
                                    />
                                )}
                                label="MES FACTURES"
                                labelStyle={{color : 'white', fontSize:14}}
                                style={{marginBottom : 15}}
                                activeTintColor='red'
                                focused={focused === 'mesfactures' ? true : false}
                                onPress={() => {changeFocused('mesfactures'); props.closeMenu(false); props.navigation.navigate('MyDrawer', {screen : "InvoiceScreen"})}}
                            />
                            <DrawerItem 
                                icon={() => (
                                    <AntDesign 
                                    name="setting" 
                                    color={'white'}
                                    size={30}
                                    />
                                )}
                                label="PARAMETRES"
                                labelStyle={{color : 'white', fontSize:14}}
                                style={{marginBottom : 15}}
                                activeTintColor='red'
                                focused={focused === 'parametres' ? true : false}
                                onPress={() => {changeFocused('parametres'); props.closeMenu(false); props.navigation.navigate('MyDrawer', {screen : "AccountScreen"})}}
                            />
                            
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSectionBottom}>
                                <DrawerItem 
                                    
                                    icon={() => (
                                        <AntDesign 
                                        name="logout" 
                                        size={30}
                                        color={'#ED4C67'}
                                        />
                                    )}
                                    label='DECONNECTION'
                                    labelStyle={{color : '#ED4C67', fontSize:14}}
                                    onPress={() => {props.closeMenu(false); props.navigation.navigate("ConnectionScreen")}}
                                />
                        </Drawer.Section> 
            </View>
        
    )

}

const styles = StyleSheet.create({
    drawerSectionTop: {
        flex: 1,
        marginTop: 10
    },
    drawerSectionBottom: {
        flex: 1,
        justifyContent: 'flex-end',
        color: '#ED4C67',
    }, 
    scrollSection: {
        flex: 1,
        backgroundColor: '#1B1464',
    },
})

function mapStateToProps(state) {
    return ({toggleMenu: state.toggleMenu})
}

function mapDispatchToProps(dispatch) {
    return {
      closeMenu: function(toggle) {
          dispatch( {type: 'closeMenu', toggle: toggle} )
      },
      logout: function() {
          dispatch( {type: 'logout'} )
      }
    }
   }

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);