import axios from "axios";
import { apiConfig } from "../config/config";

const instance = axios.create({
  baseURL: `http://${apiConfig.host}:${apiConfig.port}/user`,
  withCredentials: true, // authorize cookie sending to server
});

const user = (store) => (next) => (action) => {
  const setUserStore = (user) => {
    store.dispatch({
      type: "SAVE_USER",
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
  };

  if (action.type === "USER_VERIFICATION") {
    instance
      .get("/")
      .then((response) => {
        if (response.status === 200) {
          const user = response.data.data;

          setUserStore(user);
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
      .post("/login", {
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
          setUserStore(user);
        }
      })
      .catch((error) => {
        console.log(error);
        const { status } = error.response;

        if (status === 400) {
          store.dispatch({
            type: "ERROR",
            message: "Erreur dans un/plusieurs champs.",
          });
        } else if (status === 401) {
          store.dispatch({
            type: "ERROR",
            message: "Mot de passe/utilisateur incorrect(s).",
          });
        } else if (status === 409) {
          store.dispatch({
            type: "ERROR",
            message: "Utilisateur déjà connecté.",
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
      .post("/register", {
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
            message: "Enregistrement réussi.",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        const { status } = error.response;

        if (status === 400) {
          store.dispatch({
            type: "ERROR",
            message: "Erreur dans un/plusieurs champs.",
          });
        } else if (status === 403) {
          store.dispatch({
            type: "ERROR",
            message: "Utilisateur déjà inscrit",
          });
        } else {
          store.dispatch({
            type: "ERROR",
            message: "Erreur, enregistrement impossible.",
          });
        }
      });
  } else if (action.type === "LOGOUT") {
    store.dispatch({
      type: "PENDING",
      message: null,
    });
    instance
      .post("/logout")
      .then((response) => {
        if (response.status === 200) {
          store.dispatch({
            type: "SUCCESS",
            message: null,
          });
          store.dispatch({
            type: "RESET_USER",
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
  } else if (action.type === "FORGET_PASSWORD") {
    store.dispatch({
      type: "PENDING",
      message: null,
    });
    instance
      .post("/forget-password", {
        email: action.email,
      })
      .then((response) => {
        if (response.status === 200) {
          store.dispatch({
            type: "SUCCESS",
            message: "Un mail de réinitialisation vous a été envoyé.",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        const { status } = error.response;

        if (status === 400 || status === 401) {
          store.dispatch({
            type: "ERROR",
            message: "Adresse mail incorrecte.",
          });
        } else {
          store.dispatch({
            type: "ERROR",
            message: "Erreur, réinitialisation impossible.",
          });
        }
      });
  } else if (action.type === "RESET_PASSWORD") {
    store.dispatch({
      type: "PENDING",
      message: null,
    });
    instance
      .patch(`/reset-password/${action.id}/${action.token}`, {
        password: action.password,
      })
      .then((response) => {
        if (response.status === 200) {
          store.dispatch({
            type: "SUCCESS",
            message: "mot de passe réinitialisé, veuillez vous connecter.",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        const { status } = error.response;

        if (status === 400 || status === 401) {
          store.dispatch({
            type: "ERROR",
            message: "Mot de passe incorrect.",
          });
        } else {
          store.dispatch({
            type: "ERROR",
            message: "Erreur, réinitialisation impossible.",
          });
        }
      });
  } else if (action.type === "UPDATE_USER") {
    store.dispatch({
      type: "PENDING",
      message: null,
    });
    instance
      .patch(`/profile/${action.id}`, {
        name: action.name,
        email: action.email,
        actualPassword: action.actualPassword,
        newPassword: action.newPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          const user = response.data.data;

          store.dispatch({
            type: "SUCCESS",
            message: "Votre compte a été modifié avec succès.",
          });
          setUserStore(user);
        }
      })
      .catch((error) => {
        console.log(error);
        const { status } = error.response;

        if (status === 400) {
          store.dispatch({
            type: "ERROR",
            message: "Donnée(s) entrée(s) incorrecte(s).",
          });
        } else if (status === 401) {
          store.dispatch({
            type: "ERROR",
            message: "Mot de passe/utilisateur incorrect(s).",
          });
        } else {
          store.dispatch({
            type: "ERROR",
            message: "Erreur, réinitialisation impossible.",
          });
        }
      });
  } else if (action.type === "DELETE_USER") {
    store.dispatch({
      type: "PENDING",
      message: null,
    });
    instance
      .delete(`/profile/${action.id}`)
      .then((response) => {
        if (response.status === 200) {
          store.dispatch({
            type: "SUCCESS",
            message: "Votre compte a été supprimé définitivement.",
          });
          store.dispatch({
            type: "RESET_USER",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        store.dispatch({
          type: "ERROR",
          message: "Erreur, Suppression du compte impossible.",
        });
      });
  }

  next(action);
};

export default user;
