// other import
import PropTypes from "prop-types";
import styled from "@emotion/styled";
// component import
import {
  Button,
  Typography,
  Divider,
  CardContent,
  CardActions,
} from "@mui/material";

// Style
const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));
const StyledDivider = styled(Divider)({
  marginTop: "1rem",
});
const StyledCardActions = styled(CardActions)({
  padding: 0,
  paddingTop: "2rem",
});

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
