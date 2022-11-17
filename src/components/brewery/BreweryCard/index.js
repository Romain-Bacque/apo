import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActions, Divider, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Edit, Home, Phone } from "@mui/icons-material";
import styled from "@emotion/styled";

// Style
const StyledTypography = styled(Box)({
  display: "flex",
  gap: 0.5,
  fontStyle: "italic",
  fontSize: "1.3rem",
  color: "gray",
});

// Component
function Brewerie({ id, image, title, address, phone, onDelete }) {
  const parsedImage = JSON.parse(image);

  return (
    <Grid item xs={12} lg={6}>
      <Card sx={{ width: "95%", p: 1.5 }}>
        {parsedImage && (
          <CardMedia
            component="img"
            height="140px"
            width="100%"
            image={parsedImage.path}
            alt={`Photo de la brasserie '${title}'`}
          />
        )}
        <CardContent sx={{ textAlign: "start" }}>
          <Typography gutterBottom variant="h5" component="h4">
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
        </CardContent>
        <Divider light />
        <CardActions>
          <Button
            sx={{ mr: "0.5rem" }}
            component={Link}
            to={`/brewery/breweryForm/${id}`}
          >
            <Edit sx={{ mr: "0.5rem" }} />
            Modifier
          </Button>
          <Button
            sx={{ color: "#f2cc96" }}
            variant="outlined"
            onClick={() => onDelete(id)}
          >
            Supprimer
          </Button>
        </CardActions>
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
