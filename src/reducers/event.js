export const initialState = {
  events: [],
};

const eventReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SAVE_EVENTS":
      return {
        ...state,
        events: action.events,
      };
    default:
      return state;
  }
};

export default eventReducer;
