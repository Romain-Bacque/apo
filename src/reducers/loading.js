export const initialState = {
  message: "",
  status: "pending",
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "PENDING":
      return {
        message: action.message,
        status: "pending",
      };
    case "INFO":
      return {
        message: action.message,
        status: "info",
      };
    case "SUCCESS":
      return {
        message: action.message,
        status: "success",
      };
    case "ERROR":
      return {
        message: action.message,
        status: "error",
      };
    default:
      return state;
  }
};

export default reducer;
