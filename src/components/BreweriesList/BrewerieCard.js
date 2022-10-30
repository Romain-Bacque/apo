import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import TagsList from "../UI/TagsList";
import { Home, Phone } from "@mui/icons-material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";

// Style
const StyledTypography = styled(Box)({
  display: "flex",
  gap: 0.5,
  fontStyle: "italic",
  fontSize: "1.3rem",
  color: "gray",
});

function BrewerieCard({ title, phone, address, tags, image, id }) {
  return (
    <Card sx={{ width: "95%", padding: 1.5 }}>
      <CardMedia
        component="img"
        height="140px"
        width="100%"
        image={image}
        alt={`image/logo brasserie '${title}'`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h4">
          {title}
        </Typography>
        <StyledTypography gutterBottom variant="p" component="p">
          <Home sx={{ fontSize: "2rem" }} />
          {address}
        </StyledTypography>
        <StyledTypography>
          <Phone />
          <Typography gutterBottom variant="p" component="p">
            {phone}
          </Typography>
        </StyledTypography>
        <TagsList list={tags} />
      </CardContent>
      <Divider light />
      <CardActions>
        <Button size="small">
          <Link to={`/breweries/${id}`}>Plus de détails</Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default BrewerieCard;
