import PropTypes from "prop-types";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import theme from "../../styles/theme";

// Component
function AuthContainerThemeProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <ThemeProvider
        theme={(theme) =>
          createTheme({
            ...theme,
            components: {
              ...theme.components,
              MuiContainer: {
                styleOverrides: {
                  root: {
                    ...theme.components.MuiContainer.styleOverrides.root,
                    width: "500px",
                    maxWidth: "90%",
                    padding: "3rem",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    border: "1px solid rgb(230, 230, 230)",
                    fontFamily: "Roboto, sans-serif",
                  },
                },
              },
            },
          })
        }
      >
        {children}
      </ThemeProvider>
    </ThemeProvider>
  );
}

AuthContainerThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContainerThemeProvider;
