import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActions, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { Home, Phone } from "@mui/icons-material";
import styled from "@emotion/styled";
import TagsList from "../UI/TagsList";

// Style
const StyledTypography = styled(Box)({
  display: "flex",
  gap: 0.5,
  fontStyle: "italic",
  fontSize: "1.3rem",
  color: "gray",
});

// Component
function BrewerieCard({ id, title, phone, address, tags, image }) {
  const parsedImage = JSON.parse(image);

  return (
    <Card sx={{ width: "95%", padding: 1.5 }}>
      {parsedImage && (
        <CardMedia
          component="img"
          height="140px"
          width="100%"
          image={parsedImage.path}
          alt={`Photo de la brasserie '${title}'`}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h4">
          {title}
        </Typography>
        <StyledTypography variant="p" component="p">
          <Home sx={{ fontSize: "2rem" }} />
          {address}
        </StyledTypography>
        <StyledTypography>
          <Phone sx={{ fontSize: "2rem" }} />
          {phone}
        </StyledTypography>
        <TagsList list={tags} />
      </CardContent>
      <Divider light />
      <CardActions>
        <Button sx={{ marginLeft: "auto", marginRight: "auto" }} size="small">
          <Link to={`/brewery/${id}`}>Plus de détails</Link>
        </Button>
      </CardActions>
    </Card>
  );
}

BrewerieCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  image: PropTypes.string.isRequired,
};

export default BrewerieCard;
