import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  Button,
  Card,
  CardActions,
  Typography,
  Modal,
  Divider,
  CardContent,
} from "@mui/material";

// Style
const ModalCard = styled(Card)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  maxWidth: "90%",
  padding: "1.5rem",
});

// Component
function CustomModal({
  id,
  title,
  description,
  isOpen,
  setIsOpen,
  onValidate,
}) {
  return (
    <Modal open={isOpen}>
      <ModalCard>
        <CardContent>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {title}
          </Typography>
          {description && (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {description}
            </Typography>
          )}
        </CardContent>
        <Divider light />
        <CardActions sx={{ padding: 0, marginTop: "1rem" }}>
          <Button onClick={() => onValidate(id)} size="small">
            Valider
          </Button>
          <Button
            sx={{ color: "#f2cc96" }}
            variant="outlined"
            onClick={() => setIsOpen(false)}
            size="small"
          >
            Annuler
          </Button>
        </CardActions>
      </ModalCard>
    </Modal>
  );
}

CustomModal.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
};

export default CustomModal;
