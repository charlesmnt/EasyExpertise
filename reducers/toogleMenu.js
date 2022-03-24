export default function(toggleMenu=false, action) {
    if (action.type === 'displayMenu') {
        var turnOnMenu = action.toggle
        return turnOnMenu
    } else if (action.type === 'closeMenu') {
        var turnOnMenu = action.toggle
        return turnOnMenu
    } else {
        return toggleMenu
    }
}