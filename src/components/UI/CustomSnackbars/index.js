// hook import
import { forwardRef } from "react";
import PropTypes from "prop-types";
// component import
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
// styled component import
import { StyledMuiAlert } from "./style";

// Child Component
const Alert = forwardRef((props, ref) => (
  <StyledMuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

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
        sx={{ opacity: "0.85" }}
        open={isOpen}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={status}>
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
