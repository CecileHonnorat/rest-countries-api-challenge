export default function (selectedMode = false, action){
    if(action.type === 'changeMode'){
        console.log(selectedMode)
        return !selectedMode
    } else {
        return selectedMode
    }
}