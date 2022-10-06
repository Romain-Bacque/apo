export const initialState = {
    searchValue: '',
}; 


const searchReducer = (state = initialState, action = {}) => {

    switch (action.type) {

        case 'SEARCH_VALUE': 
        return {
            ...state,
            searchValue: state.searchValue
        };
        default:
            return state;
    }
};

export default searchReducer;