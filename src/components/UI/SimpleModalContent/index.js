// other import
import PropTypes from "prop-types";
// component import
import { Button, Typography, CardContent } from "@mui/material";
// styled component import
import { CancelButton, StyledCardActions, StyledDivider } from "./style";

function SimpleModalContent({ id, title, description, onValidate, onCancel }) {
  return (
    <CardContent>
      <Typography id="modal-modal-title" variant="h5" component="h2">
        {title}
      </Typography>
      {description && (
        <Typography m="1rem 0" id="modal-modal-description" mt={2}>
          {description}
        </Typography>
      )}
      <StyledDivider light />
      <StyledCardActions>
        <Button onClick={() => onValidate(id)} size="small">
          Valider
        </Button>
        <CancelButton variant="outlined" onClick={onCancel} size="small">
          Annuler
        </CancelButton>
      </StyledCardActions>
    </CardContent>
  );
}

SimpleModalContent.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
};

SimpleModalContent.defaultProps = {
  id: null,
  description: null,
};

export default SimpleModalContent;
