import React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackbars({
  isOpen,
  message,
  statut,
  setIsOpen,
}) {
  const handleClose = (_, reason) => {
    console.log("fsd");
    if (reason === "clickaway") {
      return;
    }
    setIsOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={isOpen}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={statut}
          sx={{ width: "100%", margin: "5rem auto" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
