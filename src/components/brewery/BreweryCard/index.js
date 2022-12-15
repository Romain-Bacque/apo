// other import
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Edit, DeleteForever, Home, Phone } from "@mui/icons-material";
// component import
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Divider,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

// Style
const StyledCardMedia = styled(CardMedia)({
  height: "140px",
  width: "100%",
});
const StyledTypography = styled(Typography)({
  display: "flex",
  gap: 0.5,
  fontStyle: "italic",
  fontSize: "1.3rem",
  color: "gray",
});
const StyledCardContent = styled(CardContent)({
  textAlign: "start",
});
const StyledDivider = styled(Divider)({
  margin: "2rem 0",
});
const DeleteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

// Component
function Brewerie({ id, image, title, address, phone, onDelete }) {
  const parsedImage = JSON.parse(image);

  return (
    <Grid sx={{ listStyle: "none" }} component="li" item xs={12} md={10}>
      <Card>
        {parsedImage && (
          <StyledCardMedia
            component="img"
            image={parsedImage.path}
            alt={`Photo de la brasserie '${title}'`}
          />
        )}
        <StyledCardContent>
          <Typography variant="h5" component="h4">
            {title}
          </Typography>
          <StyledTypography variant="p" component="p">
            <Home />
            {address}
          </StyledTypography>
          <StyledTypography variant="p" component="p">
            <Phone />
            {phone}
          </StyledTypography>
          <StyledDivider light />
          <CardActions>
            <Button
              startIcon={<Edit />}
              sx={{ mr: "0.5rem" }}
              component={Link}
              to={`/brewery/breweryForm/${id}`}
            >
              Modifier
            </Button>
            <DeleteButton
              startIcon={<DeleteForever />}
              variant="outlined"
              onClick={() => onDelete(id)}
            >
              Supprimer
            </DeleteButton>
          </CardActions>
        </StyledCardContent>
      </Card>
    </Grid>
  );
}

Brewerie.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Brewerie;
