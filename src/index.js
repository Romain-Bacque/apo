import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import store from "./store";
import "./styles/index.scss";
import theme from "./styles/theme";
import App from "./components/App";

const rootReactElement = (
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

// DOM Target
const root = ReactDOM.createRoot(document.getElementById("root"));

// Reconciliation between Real DOM and Virtual DOM
root.render(rootReactElement);
