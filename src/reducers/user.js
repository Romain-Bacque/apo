
export const initialState = {
    logged: false,
    id: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
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
                logged: false,
            };
        case 'SAVE_USER':
            return {
                ...state,
                id: action.id,
                email: action.email,
                password: action.password,
                name: action.name,
                role: action.role,
                logged: true,
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


