export const initialState = {
    isLoggedIn: false,
    name: '',
    email:  '',
    password: '',
    loading: false,
    role: 'user', // TODO a changer 
}; 



const reducer = (state = initialState, action = {}) => {

    switch (action.type) {

        case 'CHANGE_VALUE': // pour ajouter un champ controller
        return {
            ...state,
            [action.key]: action.value,
            // la notation entre crochet me permet de spécifier
            // via une expression le nom de la propriété cliblée
        };
        case 'REGISTER_SUCCCESS':
            return {
              ...state,
            };
        case 'LOGIN':
            return {
              ...state,
              isLoggedIn: true,
            };
        case 'SAVE_USER':
            return {
                ...state,
                email: '',
                password: '',
            };
        case 'LOGOUT': //? Logout = boulean isLoggedIn = false
            return {
                ...state,
                isLoggedIn: false,
            };
        case 'DELETE_USER': //? DELETE Un User
            return {
                ...state,
            };
            default:
                return state;
        case 'UPDATE_USER':
            return {
                ...state
            }
    }
};

export default reducer;