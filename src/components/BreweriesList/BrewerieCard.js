// other import
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Home, Phone } from "@mui/icons-material";
// component import
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActions, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import TagsList from "../UI/TagsList";

// Style
const StyledTypography = styled(Box)({
  display: "flex",
  gap: 0.5,
  fontStyle: "italic",
  fontSize: "1.3rem",
  color: "gray",
});
const MoreDetailsButton = styled(Button)({
  marginTop: "2rem",
  marginLeft: "auto",
  marginRight: "auto",
});
const StyledDivider = styled(Divider)({
  marginTop: "1rem",
});

// Component
function BrewerieCard({ id, title, phone, address, tags, image }) {
  const parsedImage = JSON.parse(image);

  return (
    <Card variant="outlined">
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
        <StyledDivider light />
        <CardActions>
          <MoreDetailsButton size="small">
            <Link to={`/brewery/${id}`}>Plus de détails</Link>
          </MoreDetailsButton>
        </CardActions>
      </CardContent>
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
