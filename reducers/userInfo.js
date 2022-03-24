export default function(userInfo={}, action) {
    if (action.type === 'connect') {
        userInfo = {...userInfo, firstname: action.userInfo.firstname, token: action.userInfo.token, lastname:action.userInfo.lastname, address : action.userInfo.address, phone: action.userInfo.phone, siret: action.userInfo.siret, email : action.userInfo.email}
        return userInfo
    } else if (action.type === 'logout') {
        return userInfo
    } else if (action.type === 'majDetails'){
        var userinfoCopy = {...userInfo}
        userinfoCopy.firstname= action.firstname
        userinfoCopy.lastname= action.lastname
        userinfoCopy.phone= action.phone
        userinfoCopy.email= action.email
        userinfoCopy.siret= action.siret
        userinfoCopy.address=action.address

        return userinfoCopy
    } else {
        return userInfo
    }
}