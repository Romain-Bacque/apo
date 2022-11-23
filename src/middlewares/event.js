// other import
import axios from "axios";
// config file import
import { apiConfig } from "../config/config";

const instance = axios.create({
  baseURL: `http://${apiConfig.host}:${apiConfig.port}/event`,
  withCredentials: true, // authorize cookie sending to server
});

const category = (store) => (next) => (action) => {
  if (action.type === "ADD_EVENT") {
    store.dispatch({
      type: "PENDING",
      message: null,
    });
    instance
      .post(`/${action.breweryId}`, {})
      .then((response) => {
        if (response.status === 200) {
          const RegistrationMessage = response.data.data;

          store.dispatch({
            type: "SUCCESS",
            message: RegistrationMessage,
          });
        }
      })
      .catch(() => {
        store.dispatch({
          type: "ERROR",
          message: "Une erreur est survenue pendant l'inscription.",
        });
      });
  } else if (action.type === "ADD_PARTICIPANT") {
    store.dispatch({
      type: "PENDING",
      message: null,
    });

    instance
      .post(`/${action.eventId}/user`, {})
      .then((response) => {
        if (response.status === 200) {
          const RegistrationMessage = response.data.data;

          store.dispatch({
            type: "SUCCESS",
            message: RegistrationMessage,
          });
        }
      })
      .catch(() => {
        store.dispatch({
          type: "ERROR",
          message: "Une erreur est survenue pendant l'inscription.",
        });
      });
  }

  next(action);
};

export default category;
