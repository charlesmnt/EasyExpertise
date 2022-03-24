export default function(noteTab=[], action) {
    if(action.type === 'saveNote') {
        return ([...noteTab, {note: action.noteContent, noteTitle: action.noteTitle, 
            categoryTitle: action.categoryTitle, idNote: action.idNote} ])
    } else if (action.type === 'downloadNote') {
        if(action.noteList.length>0){
        var noteArrayCopy = action.noteList.map((element, i) => {
            return({note: element.text, noteTitle: element.title,
            categoryTitle: element.roomNote, idNote: element._id})})
            console.log("MAJ dans store",noteArrayCopy)
        return noteArrayCopy
        } else {
        var noteArrayCopy = []
        return noteArrayCopy
        }
    } else if (action.type === 'deleteNote') {
        var noteArrayCopy = [...noteTab]
        noteArrayCopy.splice(action.index, 1)
        return noteArrayCopy
    } else if (action.type === 'editNote') {
        var noteArrayCopy = [...noteTab]
        var index = noteArrayCopy.findIndex((element) => String(element.idNote) === action.idNote)
        noteArrayCopy[index].note = action.noteContent
        noteArrayCopy[index].noteTitle = action.noteTitle
        noteArrayCopy[index].categoryTitle = action.categoryTitle
        return noteArrayCopy
    } else {
        return noteTab
    }
}