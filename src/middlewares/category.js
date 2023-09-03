// other import
import axios from "axios";
// action creator import
import { pending, success, error, saveCategories } from "../actions";

const instance = axios.create({
  baseURL: `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/category`,
  withCredentials: true, // authorize cookie sending to server,
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

export { category };
