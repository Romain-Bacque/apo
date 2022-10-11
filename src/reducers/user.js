
export const initialState = {
    isLoggedIn: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    loading: false,
}; 

const reducer = (state = initialState, action = {}) => {

    switch (action.type) {

        case 'CHANGE_VALUE': // pour ajouter un champ controller
            return {
                ...state,
                [action.key]: action.value,
                // la notation entre crochet me permet de spécifier
                // via une expression le nom de la propriété ciblée
            };
        case 'RESET_USER':
            return {
                ...state,
                name: '',
                email: '',
                password: '',
                role: '',
                isLoggedIn: false,
            };
        case 'SAVE_USER':
            return {
                ...state,
                email: action.email,
                password: action.password,
                role: action.role,
                logged: action.logged,
            };
        case 'UPDATE_USER':
            return {
                ...state
            }
        default:
            return state;
    }
};

export default reducer;


