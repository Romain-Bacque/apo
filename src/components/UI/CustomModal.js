// other import
import PropTypes from "prop-types";
import styled from "@emotion/styled";
// component import
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
const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));
const ModalCard = styled(Card)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  maxWidth: "90%",
  padding: "1.5rem",
});
const StyledCardActions = styled(CardActions)({
  padding: 0,
  marginTop: "1rem",
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
            <Typography id="modal-modal-description" mt={2}>
              {description}
            </Typography>
          )}
        </CardContent>
        <Divider light />
        <StyledCardActions>
          <Button onClick={() => onValidate(id)} size="small">
            Valider
          </Button>
          <CancelButton
            variant="outlined"
            onClick={() => setIsOpen(false)}
            size="small"
          >
            Annuler
          </CancelButton>
        </StyledCardActions>
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
