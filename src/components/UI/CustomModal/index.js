// other import
import PropTypes from "prop-types";
// component import
import { Modal } from "@mui/material";
import { Close } from "@mui/icons-material";
import { memo } from "react";
// styled component import
import { StyledCard, StyledIconButton } from "./style";

// Component
function CustomModal({ isOpen, setIsOpen, children }) {
  return (
    <Modal open={isOpen}>
      <StyledCard>
        <StyledIconButton onClick={() => setIsOpen(false)}>
          <Close />
        </StyledIconButton>
        {children}
      </StyledCard>
    </Modal>
  );
}

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  children: PropTypes.node,
};

CustomModal.defaultProps = {
  children: null,
};

export default memo(CustomModal);
