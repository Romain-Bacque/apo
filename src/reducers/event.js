export const initialState = {
  ownerEvents: [],
  participantEvents: [],
};

const eventReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SAVE_OWNER_EVENTS":
      return {
        ...state,
        ownerEvents: action.events,
      };
    case "SAVE_PARTICIPANT_EVENTS":
      return {
        ...state,
        participantEvents: action.events,
      };
    case "RESET_EVENTS":
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default eventReducer;
