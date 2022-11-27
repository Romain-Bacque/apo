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
    case "REMOVE_OWNER_EVENT":
      return {
        ...state,
        ownerEvents: state.ownerEvents.filter(
          (event) => event.id !== action.eventId
        ),
      };
    case "REMOVE_PARTICIPANT_EVENT":
      return {
        ...state,
        participantEvents: state.participantEvents.filter(
          (event) => event.id !== action.eventId
        ),
      };
    default:
      return state;
  }
};

export default eventReducer;
