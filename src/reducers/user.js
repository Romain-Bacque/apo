export const initialState = {
    logged: true,
    email:  '',
    password: '',
    loading: false,
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
        case 'LOGIN':
            return {
              ...state,
            };
        case 'SAVE_USER':
            return {
                ...state,
                email: '',
                password: '',
                logged: action.logged,
            };
        default: return state;
    }
};

export default reducer;