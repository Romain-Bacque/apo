import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // palette is area that store our customs colors
  palette: {
    // Most important color
    primary: {
      main: "#f2cc96",
      light: "#ffffc7",
      dark: "#be9b68",
    },
    // Secondary Color
    secondary: {
      main: "#F7EBC9",
      light: "#fffffc",
      dark: "#c4b998",
    },
    // Error message color.
    error: {
      main: "#d32f2f",
    },
    // Important message color, for potentially dangerous action
    warning: {
      main: "#ed6c02",
    },
    // Information message color
    info: {
      main: "#0288d1",
    },
    // indiquer la réussite d'une action
    success: {
      main: "#2e7d32",
    },
    /*
            Si "contrastText" est omis,
            sa valeur sera calculée pour contraster avec "main",
            selon la valeur de "contrastThreshold".
        */
    contrastThreshold: 3,
    /*
            Si les touches "dark" et/ou "light" sont omises,
            leur(s) valeur(s) seront calculées à partir de "main",
            selon la valeur de "tonalOffset".
        */
    tonalOffset: 0.2, //  nombre compris entre 0 et 1
  },

  // Media query breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  // Override components properties
  // 'Mui' next to component name (ex: 'Button' next to 'Mui' -> 'MuiButton')
  components: {
    // CssBaseline component to kickstart an elegant, consistent, and simple baseline to build upon.
    MuiCssBaseline: {
      styleOverrides: {
        root: {
          fontFamily: "Roboto, sans-serif",
          fontStyle: "normal",
          fontWeight: 400,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: "20px",
          gap: 2,
          paddingTop: "1rem",
          paddingBottom: "1rem",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          width: "100%",
          padding: "1rem .5rem",
          margin: "1rem auto",
          boxShadow: "none",
          borderRadius: "5px",
          color: "white",
          fontWeight: 700,
          fontSize: "1rem",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "filled",
      },
      styleOverrides: {
        root: {
          width: "100%",
          margin: ".5rem 0",
          padding: ".5rem",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          margin: "0 0.5rem",
          fontSize: "1.4rem",
        },
      },
    },
  },
});

export default theme;
