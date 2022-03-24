import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Button, Overlay} from 'react-native-elements'
import { Camera } from 'expo-camera';
import { useIsFocused} from '@react-navigation/native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonic from 'react-native-vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import ipAdress from '../ipConfig'
import {connect} from 'react-redux'

function PhotoScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoUri, setPhotoUri] = useState('')

  var camera = useRef(null);
  const isFocused = useIsFocused();


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  var cameraDisplay;
  var photo;
  var photoDisplay;

if(photoUri===""){
  if (hasPermission && isFocused) {
    return (
        cameraDisplay = <Camera style={{ flex: 1 }}
        type={type}
        ref={ref => (camera = ref)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <IconIonic
              name="camera-reverse"
              size={20}
              color="#ffffff"
            /><Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
                flex: 1, 
                alignSelf: 'flex-end',
                alignItems: 'center',

            }}
            onPress={async () => {
            if (camera) {
                photo = await camera.takePictureAsync({ quality: 0.3 });
                setPhotoUri(photo.uri)
                
                }}
            }>
            <MaterialIcons name="motion-photos-on" 
            size={80} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              alignItems: 'center',
              
            }}
            onPress={() => {
              setFlash(
                flash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.torch
                  : Camera.Constants.FlashMode.off
              );
            }}>
            <IconFontAwesome
              name="flash"
              size={20}
              color="#ffffff"
            /><Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flash </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    );
  } else {
      cameraDisplay = <View style={{ flex: 1 }}></View>
  }
} else {
    
    photoDisplay =
     <View style={{flex: 1}}> 
        <Image style={{flex: 7}} resizeMode='contain' source={{uri: photoUri}}/>
        <View style={{flexDirection: "row", justifyContent:'space-around', flex: 1}}>
        <Button
        onPress={() => setPhotoUri("")}
        icon={
            <IconFontAwesome
            name="refresh"
            size={20}
            color="#ffffff"
            style={{marginRight: 5}}
            />
        }
        title="Reprendre"
        buttonStyle={{ backgroundColor: "#A3CB38"}}
        containerStyle={{width: "40%"}}
        type="solid"
        />
        <Button
        onPress={async () => {
            var data = new FormData();
                data.append('avatar', {
                    uri: photoUri,
                    type: 'image/jpeg',
                    name: 'avatar.jpg',
                });
                data.append('idFolder', props.folderId)

            var rawResponse = await fetch(`${ipAdress}/upload/`, {
            method: 'POST',
            body: data
            });
            var response = await rawResponse.json();
            props.picturesTab(response.resultCloudinary.url)
            setPhotoUri("")
        }
        }   
        
        icon={
            <IconFontAwesome
            name="save"
            size={20}
            color="#ffffff"
            style={{marginRight: 5}}
            />
        }
        title="Enregistrer"
        buttonStyle={{ backgroundColor: "#A3CB38" }}
        containerStyle={{width: "40%"}}
        type="solid"
        />
        </View>
    </View>
}

  return (
    <View style={{ flex: 1 }}>

      {cameraDisplay}
      {photoDisplay}

    </View>
  );
}

function mapStateToProps(state) {
  return ({folderId: state.folderInfo})
}
function mapDispatchToProps(dispatch) {
  return {
    picturesTab: function(urlPicture) {
        dispatch( {type: 'savePicture', urlPicture: urlPicture} )
    }
  }
 }

export default connect (mapStateToProps, mapDispatchToProps)(PhotoScreen);