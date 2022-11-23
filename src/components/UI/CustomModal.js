// other import
import PropTypes from "prop-types";
import styled from "@emotion/styled";
// component import
import { Card, Modal } from "@mui/material";

// Style
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
function CustomModal({ isOpen, children }) {
  return (
    <Modal open={isOpen}>
      <StyledCard>{children}</StyledCard>
    </Modal>
  );
}

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

CustomModal.defaultProps = {
  children: null,
};

export default CustomModal;
