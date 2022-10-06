export const initialState = {
    isLoggedIn: true,
    name: '',
    email:  '',
    password: '',
    loading: false,
    role: '',
    isRegistered: false,
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
        case 'REGISTER':
            return {
              ...state,
              isRegistered: true,
            };
        case 'GET_ROLE':
            return {
                role: '',
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
                role: '',
            };
        case 'LOGOUT': //? Logout = boulean isLoggedIn = false
            return {
                ...state,
                isLoggedIn: false,
            };
        case 'DELETE_USER': // TODO Delete Un User
            return {
                ...state,
            };
            default: 
                return state;
        case 'UPDATE_USER': // TODO A faire le reducer pour mettre a jouer le profile
            return {
                ...state
            }
    }
};

export default reducer;