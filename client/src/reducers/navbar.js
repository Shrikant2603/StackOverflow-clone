const initialState = {
    isMenuOpen: false
}
const navbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MENU_OPEN':
            return {
                ...state,
                isMenuOpen: action.payload,
              };
        default:
            return state;
    }
  }
  
  export default navbarReducer;