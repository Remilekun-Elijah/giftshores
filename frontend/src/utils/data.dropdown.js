/* eslint-disable no-unused-expressions */
class Menu {
  constructor ({action, setFormData, setModalAction, setModal, type, refresh}) {

  this.action = action;
  this.setModalAction = setModalAction;
  this.refresh = refresh;
  this.setModal = setModal;
  this.setFormData = setFormData;
  this.type = type;
 }

 edit ({ navigate, action, route, name}){
  return {
    text: "Edit",
    action: (_, state) => {
      action?.(state)
      navigate(`${route}/${state['id' || name]}`, { state: { editable: true, ...state }})
    }
 }  
}
view ({ action, name}){
  return {
    text: `View ${name || ''}`,
    action: (_, state) => {
      action(state)
      // navigate(route+'/'+state.id, { state })
    }
 }
}
delete ({ action, type }) {
  return {
    text: `Delete ${type || ''}`,
    action: (_, state) => {
      action(state)
    }
 }
}
}
export default Menu;