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
      main: "#cb9951",
      light: "#fffffc",
      dark: "#b28646",
    },
    // Error message color
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
    // Success message color
    success: {
      main: "#2e7d32",
    },
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
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
          margin: "1rem 0",
        },
      },
    },
    MuiCard: {
      defaultProps: {
        variant: "contained",
        elevation: 1,
      },
      styleOverrides: {
        root: {
          backgroundColor: "white",
          borderRadius: "10px",
          overflow: "hidden",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "secondary",
      },
      styleOverrides: {
        root: {
          width: "100%",
          padding: "1rem .5rem",
          margin: "auto",
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
        variant: "standard",
      },
      styleOverrides: {
        root: {
          width: "100%",
          padding: ".5rem",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "1.4rem",
        },
      },
    },
  },
});

export default theme;
