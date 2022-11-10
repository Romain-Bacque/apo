import { forwardRef } from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Child Component
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Component
function CustomSnackbars({ isOpen, message, status, setIsOpen }) {
  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpen(false);
  };

  return (
    <Stack spacing={2}>
      <Snackbar
        open={isOpen}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={status}
          sx={{ width: "100%", margin: "5rem auto" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

CustomSnackbars.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default CustomSnackbars;
