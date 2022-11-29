// action type import
import { REMOVE_EVENT, RESET_EVENTS, SAVE_EVENTS } from "../actions";

export const initialState = {
  ownerEvents: [],
  participantEvents: [],
};

const eventReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_EVENTS:
      return {
        ...state,
        [action.key]: action.events,
      };
    case REMOVE_EVENT:
      return {
        ...state,
        [action.key]: state[action.key].filter(
          (event) => event.id !== action.eventId
        ),
      };
    case RESET_EVENTS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default eventReducer;
