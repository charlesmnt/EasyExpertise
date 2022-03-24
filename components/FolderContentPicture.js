import React, {useState} from "react";
import {
    Text,
    View,
    FlatList,
    SafeAreaView, 
    StyleSheet,
    ActivityIndicator
  } from 'react-native';
import {Image} from 'react-native-elements';
import {connect} from 'react-redux';

function FolderContentPicture(props) {

if (props.picturesList.length > 0) {
  console.log("supérieur")
  return (
  <SafeAreaView>
      
        <FlatList
          data={[...props.picturesList].map((element, i) => {
              return ({uri : element.pictureUri, id: i})
            })
            }
          style={styles.list}
          numColumns={2}
          keyExtractor={(e) => e}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.uri }}
              containerStyle={styles.item}
              PlaceholderContent={<ActivityIndicator />}
            />
          )}
        />
  </SafeAreaView>
  )
     
  } else {
    console.log("égale")
    return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
    <Text>Il n'y a pas de photo dans votre dossier</Text>
    </View>
    )
  }

}

const styles = StyleSheet.create({
    list: {
      width: '100%',
      backgroundColor: '#000',
    },
    item: {
      aspectRatio: 1,
      width: '100%',
      flex: 1,
    },
  });


function mapStateToProps(state) {
    return ({ picturesList: state.picturesTab })
  }

function mapDispatchToProps(dispatch) {
    return {
      picturesTab: function(pictureId) {
          dispatch( {type: 'deletePicture', pictureId: pictureId} )
      }
    }
   }

export default connect (mapStateToProps, mapDispatchToProps)(FolderContentPicture);