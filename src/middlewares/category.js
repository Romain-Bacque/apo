// other import
import axios from "axios";
// action creator import
import { pending, success, error, saveCategories } from "../actions";
// config file import
import { apiConfig } from "../config/config";

const instance = axios.create({
  baseURL: `http://${apiConfig.host}:${apiConfig.port}/category`,
  withCredentials: true, // authorize cookie sending to server
});

const category = (store) => (next) => (action) => {
  if (action.type === "FETCH_CATEGORIES") {
    store.dispatch(pending());
    instance
      .get("/")
      .then((response) => {
        const categories = response.data.data;

        store.dispatch(success(null));
        store.dispatch(saveCategories(categories));
      })
      .catch(() => {
        store.dispatch(error("Une erreur est survenue."));
      });
  }

  next(action);
};

export default category;
