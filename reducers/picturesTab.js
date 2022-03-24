export default function (picturesTab = [], action) {
    if (action.type === 'savePicture') {
        return [...picturesTab, { pictureUri: action.urlPicture }]
    } else if (action.type === 'downloadPicture') {
        var pictureArrayCopy = action.pictureArray.map((element, i) => {
            return ({ pictureUri: element.pictureUrl })
        })
        return pictureArrayCopy;
    } else {
        return picturesTab;
    }
}