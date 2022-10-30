// == Import : npm
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./styles/index.scss";
import App from "./components/App";
import store from "./store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";

// == Render
// 1. Élément React racine (celui qui contient l'ensemble de l'app)
//    => crée une structure d'objets imbriqués (DOM virtuel)
const rootReactElement = (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StrictMode>
          <App />
        </StrictMode>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const root = ReactDOM.createRoot(document.getElementById("root"));

// 3. Déclenchement du rendu de React (virtuel) => DOM (page web)
root.render(rootReactElement);
