import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  StyleProp,
  TextStyle,
  ViewStyle,
  SafeAreaView,
} from 'react-native';
import { Header as HeaderRNE, HeaderProps, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';


function Header(props) {

  return (

    <HeaderRNE
      containerStyle={{ backgroundColor: '#1B1464' }}

      leftComponent={
        <View>

          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => { props.displayMenu(true) }}
          >
            <Ionicons name="ios-menu" size={30} color="white" />
          </TouchableOpacity>
        </View>
      }
      rightComponent={
        <View style={styles.headerRight}>
          <Text style={{ color: 'white' }}>{props.userInfo.firstname}</Text>
          <Ionicons name="person-circle-outline" size={24} color="white"
            onPress={() => props.navigation.navigate("AccountScreen")} />
        </View>
      }
      centerComponent={{ text: props.name, style: styles.heading }}
    />  

  );
}
const styles = StyleSheet.create({

  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    alignItems: "center",
    justifyContent: 'flex-end',
  },

});

function mapDispatchToProps(dispatch) {
  return {
    displayMenu: function (toggle) {
      dispatch({ type: 'displayMenu', toggle: toggle })
    }
  }
}

function mapStateToProps(state) {
  return ({ userInfo: state.userInfo, picturesList: state.picturesTab })
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);