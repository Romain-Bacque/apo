
export const initialState = {
    message: '',
    statut: null,
    isOpen: false,
}; 

const reducer = (state = initialState, action = {}) => {

    switch (action.type) {
        case 'SEND':
            return {
                message: action.message,
                statut: 'info'
            };
        case 'SUCCESS':
            return {
                message: action.message,
                statut: 'success'
            };
        case 'ERROR':
            return {
                message: action.message,
                statut: 'error'
            };
        case 'RESET_SNACKBAR':
            return {
                message: '',
                statut: null
            };
        case 'SHOW':
            return {
                ...state,
                isOpen: action.isOpen
            };
        default:
            return state;
    }
};

export default reducer;


