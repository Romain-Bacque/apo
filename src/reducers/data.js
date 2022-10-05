export const initialState = {
  breweries: [],
  loading: true,
}; 



const dataReducer = (state = initialState, action = {}) => {

    switch (action.type) {

        case 'SAVE_DATA':
        return {
            ...state,
            breweries: action.breweries,
            loading: action.loading,
        };
        default:
            return state;
    }
};

export default dataReducer;