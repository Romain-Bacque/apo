import { createTheme } from "@mui/material/styles";

const authTheme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          width: "500px",
          maxWidth: "90%",
          padding: "3rem",
          backgroundColor: "white",
          borderRadius: "10px",
          border: "1px solid rgb(230, 230, 230)",
          boxShadow: "0px 0px 6px 3px rgb(240, 240, 240)",
        },
      },
    },
  },
});

export default authTheme;
