import axios from "axios";
import { apiConfig } from "../config/config";

const instance = axios.create({
  baseURL: `http://${apiConfig.host}:${apiConfig.port}`,
  withCredentials: true,
});

const user = (store) => (next) => (action) => {
  const state = store.getState();

  if (action.type === "USER_VERIFICATION") {
    instance
      .get("/")
      .then((response) => {
        if (response.status === 200) {
          const user = response.data.data;

          store.dispatch({
            type: "SAVE_USER",
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (action.type === "LOGIN") {
    store.dispatch({
      type: "PENDING",
      message: null,
    });
    instance
      .post("/user/login", {
        email: action.email,
        password: action.password,
      })
      .then((response) => {
        if (response.status === 200) {
          const user = response.data.data;

          store.dispatch({
            type: "SUCCESS",
            message: `Bienvenue ${user.name} !`,
          });
          store.dispatch({
            type: "SAVE_USER",
            id: user.id,
            email: user.email,
            password: user.password,
            name: user.name,
            role: user.role,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        const { status } = error.response;

        if (status === 400) {
          store.dispatch({
            type: "ERROR",
            message: "erreur dans un/plusieurs champs",
          });
        } else if (status === 401) {
          store.dispatch({
            type: "ERROR",
            message: "mot de passe/utilisateur incorrect(s)",
          });
        } else if (status === 409) {
          store.dispatch({
            type: "ERROR",
            message: "utilisateur déjà connecté",
          });
        } else {
          store.dispatch({
            type: "ERROR",
            message: "Erreur, connexion impossible.",
          });
        }
      });
  } else if (action.type === "REGISTER") {
    store.dispatch({
      type: "PENDING",
      message: null,
    });
    instance
      .post("/user/register", {
        name: action.name,
        email: action.email,
        password: action.password,
        role: action.role,
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          store.dispatch({
            type: "SUCCESS",
            message: "enregistrement réussi.",
          });
        }
      })
      .catch((error) => {
        const { status } = error.response;

        if (status === 400) {
          store.dispatch({
            type: "ERROR",
            message: "erreur dans un/plusieurs champs",
          });
        } else if (status === 403) {
          store.dispatch({
            type: "ERROR",
            message: "utilisateur déjà inscrit",
          });
        } else {
          store.dispatch({
            type: "ERROR",
            message: "Erreur, enregistrement impossible.",
          });
        }
      });
  } else if (action.type === "LOGOUT") {
    instance
      .post("/user/logout")
      .then((response) => {
        store.dispatch({
          type: "PENDING",
          message: null,
        });
        if (response.status === 200) {
          store.dispatch({
            type: "RESET_USER",
          });
          store.dispatch({
            type: "SUCCESS",
            message: null,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        store.dispatch({
          type: "ERROR",
          message: "Erreur, déconnexion impossible.",
        });
      });
  } else if (action.type === "DELETE_USER") {
    instance
      .delete("/user/delete", {
        email: state.user.email,
        password: state.user.password,
        name: state.user.name,
      })
      .then((response) => {
        const user = response.data.data;

        store.dispatch({
          type: "DELETE_USER",
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("Erreur impossible de supprimer le user");
      });
  }
  // else if (action.type === 'UPDATE_USER'){
  // instance.put('/user',{
  //   email: state.user.email,
  //   password: state.user.password,
  //   name: state.user.name,
  // })
  // .then((response) => {
  //   console.log(`réponse back ${response.data}`)
  //   store.dispatch({
  //     type: 'DELETE_USER',
  //   });
  // })
  // .catch((error) => {
  //   console.log(error);
  //   console.log('Erreur impossible de supprimer le user');
  // });
  // }

  next(action);
};

export default user;
