import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import TagsList from "../UI/TagsList";
import { Home, Phone } from "@mui/icons-material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";

// Style
const StyledBox = styled(Box)({
  display: "flex",
  gap: 1,
});
const StyledButton = styled(Button)({
  p: ".5rem",
  fontSize: "1rem",
  color: "white",
  marginTop: "1.2rem",
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
        <Typography gutterBottom variant="h4" component="h4">
          {title}
        </Typography>
        <StyledBox>
          <Home />
          <Typography gutterBottom variant="p" component="p">
            {address}
          </Typography>
        </StyledBox>
        <StyledBox>
          <Phone />
          <Typography gutterBottom variant="p" component="p">
            {phone}
          </Typography>
        </StyledBox>
        <TagsList list={tags} />
      </CardContent>
      <Divider light />
      <StyledButton size="small">
        <Link to={`/breweries/${id}`}>Plus de détails</Link>
      </StyledButton>
    </Card>
  );
}

export default BrewerieCard;
