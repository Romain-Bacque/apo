import axios from "axios";
import { apiConfig } from "../config/config";

const instance = axios.create({
  baseURL: `http://${apiConfig.host}:${apiConfig.port}/category`,
  withCredentials: true, // authorize cookie sending to server
});

const category = (store) => (next) => (action) => {
  if (action.type === "FETCH_CATEGORIES") {
    store.dispatch({
      type: "PENDING",
      message: null,
    });
    instance
      .get("/")
      .then((response) => {
        const categories = response.data.data;

        store.dispatch({
          type: "SUCCESS",
          message: null,
        });
        store.dispatch({
          type: "SAVE_CATEGORIES",
          categories,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  next(action);
};

export default category;
