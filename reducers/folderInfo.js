
export default function(idfolder = null, action) {
 
 if(action.type == 'showfolder') { 
              //  console.log(action.idfolder+": folder reducer")
      return action.idfolder;
 }else if(action.type == 'createFolder'){
      //Mon ajout pour afficher le nouveau dossier...
      return action.idNewFolder;
 } else {
      // console.log("not showfolder")
      return idfolder;
    }
    
   }