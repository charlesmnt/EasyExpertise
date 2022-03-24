// export default function(newFolderData={}, action) {
//     if(action.type === 'createFolder') {
        
//         // console.log('reducer opérationnel')
        
//         let newFolderDataCopy = {...newFolderData};
//         newFolderDataCopy.reference= action.reference;
//         newFolderDataCopy.nameInsured= action.nameInsured;

//         newFolderDataCopy.insurance= action.insurance;
//         newFolderDataCopy.claimDate= action.claimDate;
//         newFolderDataCopy.claimType= action.claimType;
//         newFolderDataCopy.rooms= action.rooms;
//         newFolderDataCopy.idFolder= action.idFolder;

//         console.log(newFolderDataCopy)

//         return newFolderDataCopy;
//     }
//     else {
//         return newFolderData;
//     }
//    }