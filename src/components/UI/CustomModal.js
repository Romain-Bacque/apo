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

function CustomModal({ isOpen, setIsOpen, title, description }) {
  return (
    <>
      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
            <Button size="small">Accepter</Button>
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
    </>
  );
}

export default CustomModal;
