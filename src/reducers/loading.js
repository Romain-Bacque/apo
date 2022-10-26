export const initialState = {
  message: "",
  statut: "pending",
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "PENDING":
      return {
        message: action.message,
        statut: "pending",
      };
    case "INFO":
      return {
        message: action.message,
        statut: "info",
      };
    case "SUCCESS":
      return {
        message: action.message,
        statut: "success",
      };
    case "ERROR":
      return {
        message: action.message,
        statut: "error",
      };
    case "RESET_LOADING":
      return {
        message: "",
        statut: null,
      };
    default:
      return state;
  }
};

export default reducer;
