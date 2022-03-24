import React, {useEffect, useState} from "react";
import Collapsible from 'react-native-collapsible';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    FlatList, 
    KeyboardAvoidingView
  } from 'react-native';
import { Overlay, Button} from "react-native-elements";
import IconIonic from 'react-native-vector-icons/Ionicons';
import { useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import ipAdress from '../ipConfig'



function FolderContent(props) {

    const[displayDetail, setDisplayDetail] = useState(true)
    const[takeNote, setTakeNote] = useState(false)
    const[collapseIcon, setCollapseIcon] = useState("chevron-back-circle-outline")
    const[noteContent, setNoteContent] = useState('')
    const[noteList, setNoteList] = useState([])
    const[idNoteEdit, setIdNoteEdit] = useState('')

    

    useEffect(() => {
        (async() => {
            var downloadNote = await fetch(`${ipAdress}/downloadNote/${props.idFolder}`);

            var result = await downloadNote.json()
            console.log("result back",result.note)
            props.downloadNoteTab(result.note)
            setDisplayDetail(true)
            setCollapseIcon("chevron-back-circle-outline")
    })();
    }, [props.idFolder])


    const addNoteItem = async(noteContent) => {
        var shortNote = noteContent.substring(0,30) + "..."
        setNoteContent("")
        setDisplayDetail(true)
        setCollapseIcon("chevron-back-circle-outline")
        if (idNoteEdit !== "") {

        var editNote = await fetch(`${ipAdress}/editNote`,
        {
            method: 'PUT',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `note=${noteContent}&idFolder=${props.idFolder}&idNote=${idNoteEdit}&noteTitle=${shortNote}&categoryTitle=${props.title}`
           }
          );

          var response = await editNote.json()
          props.editNoteTab(noteContent, shortNote, props.title, response.folderSaved[0]._id)
          setIdNoteEdit("")
        } else {
        
        var uploadNote = await fetch(`${ipAdress}/uploadNote`,
        {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `note=${noteContent}&idFolder=${props.idFolder}&idNote=${idNoteEdit}&noteTitle=${shortNote}&categoryTitle=${props.title}`
           }
          );
        }

        var response = await uploadNote.json()
        props.addNoteTab(noteContent, shortNote, props.title, response.folderSaved[0]._id)
    }

    const deleteNote = async(idNote) => {
        setDisplayDetail(true)
        setCollapseIcon("chevron-back-circle-outline")
        var deleteNote = await fetch(`${ipAdress}/deleteNote`,
        {
            method: 'DELETE',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `idNote=${idNote}&idFolder=${props.idFolder}`
           }
          );
        var index = props.noteList.findIndex((element) => element.idNote === idNote)
        props.deleteNoteTab(index)
        }
    

    const editNote = (idNote) => {
        setTakeNote(true)
        var filterNoteListCopy = props.noteList.filter(element => element.idNote === idNote)
        setNoteContent(filterNoteListCopy[0].note)
    }

    var noteListFilter = props.noteList.filter((element) => {
        return (element.categoryTitle === props.title)
    })

    const ListingNoteItem = ({ item }) => (
        <View style={{flex: 1, marginBottom: 3, marginTop: 3, flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
                style={{width: '80%'}}
                onPress={() => {editNote(item.idNote); setIdNoteEdit(item.idNote)}}>
            <Text>{item.noteTitle}</Text>
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
                <TouchableOpacity
                onPress={() => deleteNote(item.idNote) }>
                        <IconIonic
                            name="close-circle-sharp"
                            size={30}
                            color="#ED4C67"
                        />
                </TouchableOpacity>
            </View>
        </View>
      );

    return (
    <View style={{flex: 1}}>
        
            <View style={{flex: 1, flexDirection: "row", width:"100%"}}>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>{props.title}</Text>
                <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-end"}}>
                                 
                        <IconIonic
                            name={collapseIcon}
                            size={30}
                            color="#1B1464"
                            style={{marginLeft: 15}}
                            onPress={() => {setDisplayDetail(!displayDetail); 
                            (collapseIcon === "chevron-back-circle-outline" ? setCollapseIcon("chevron-down-circle-outline") : setCollapseIcon("chevron-back-circle-outline"))}}
                        />
                </View>
            </View>
        
        <Collapsible collapsed={displayDetail} align="center">
            <View style={{flex: 1}}>
                        <FlatList
                        data={noteListFilter}
                        renderItem={ListingNoteItem}
                        />  
                        <View style={{flex: 1, justifyContent:"center", alignItems:"center"}}>  
                        <Button 
                        title="Ajouter une note"
                        buttonStyle={{backgroundColor: "#A3CB38", borderRadius: 30}}
                        containerStyle={{width: "50%", height: 40}}
                        onPress={() => {setTakeNote(true)}}
                        />
                        </View>
            </View>
        </Collapsible>
        <Overlay
            isVisible={takeNote} onBackdropPress={() => setTakeNote(false)}
            overlayStyle={{borderRadius: 10, alignItems: 'center', width: '90%', height: 250,
            justifyContent: 'center', backgroundColor: "#1B1464"}}
        >
           
            <View style={{width: "100%", flex: 1, justifyContent: "center", alignItems: "center"}}>

                <TextInput
                    multiline={true}
                    numberOfLines={7}
                    onChangeText={(value) => setNoteContent(value)}
                    value={noteContent}
                    style={{backgroundColor: "white",fontSize: 14, width: '100%', 
                    borderColor: 'black', borderRadius: 20, borderWidth: 1, textAlign: 'center'}}
                    />
                    

                <Button 
                    buttonStyle={{backgroundColor: "#A3CB38", borderRadius: 30}}
                    containerStyle={{textAlign: "center", width: "60%",marginTop: 10, flex: 0.5, justifyContent: "center"}}
                    title={"Enregistrer"} 
                    onPress={() => {setTakeNote(false); addNoteItem(noteContent)}}/>
            </View>
         
        </Overlay>
      
    </View>
    )

}

function mapStateToProps(state) {
    return ({ noteList: state.noteTab, idFolder: state.folderInfo })
  }

function mapDispatchToProps(dispatch) {
    return {
      addNoteTab: function(noteContent, noteTitle, categoryTitle, idNote) {
          dispatch( {type: 'saveNote', noteContent, noteTitle, categoryTitle, idNote } )
      },
      deleteNoteTab: function(index) {
        dispatch( {type: 'deleteNote', index} )
    },
      editNoteTab: function(noteContent, noteTitle, categoryTitle, idNote) {
        dispatch( {type: 'editNote', noteContent, noteTitle, categoryTitle, idNote} )
    },
      downloadNoteTab: function(noteList) {
        dispatch( {type: 'downloadNote', noteList} )
    }
   }
}

export default connect (mapStateToProps, mapDispatchToProps)(FolderContent);