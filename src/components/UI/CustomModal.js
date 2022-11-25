// other import
import PropTypes from "prop-types";
import styled from "@emotion/styled";
// component import
import { Card, IconButton, Modal } from "@mui/material";
import { Close } from "@mui/icons-material";

// Style
const StyledIconButton = styled(IconButton)({
  position: "absolute",
  top: "0",
  right: "0",
});
const StyledCard = styled(Card)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  maxWidth: "90%",
  padding: "1.5rem",
});

// Component
function CustomModal({ isOpen, setIsOpen, children }) {
  return (
    <Modal open={isOpen}>
      <StyledCard>
        <StyledIconButton>
          <Close onClick={() => setIsOpen(false)} />
        </StyledIconButton>
        {children}
      </StyledCard>
    </Modal>
  );
}

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

CustomModal.defaultProps = {
  children: null,
};

export default CustomModal;
