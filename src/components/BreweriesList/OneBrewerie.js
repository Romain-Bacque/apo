import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Divider,
  Grid,
} from "@mui/material";
import "./style.scss";
import { Link } from "react-router-dom";
import TagsList from "../UI/TagsList";
import { Home, Phone } from "@mui/icons-material";
import { Box } from "@mui/system";

function OneBrewerie({ title, phone, address, tags, image, id }) {
  return (
    <Card sx={{ padding: 1.5 }}>
      <CardMedia
        component="img"
        height="140px"
        image={image}
        alt={`carte brasserie '${title}'`}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="h4">
          {title}
        </Typography>
        <Box display={"flex"} gap={0.6}>
          <Home />
          <Typography gutterBottom variant="p" component="p">
            {address}
          </Typography>
        </Box>

        <Box display={"flex"} gap={0.6}>
          <Phone />
          <Typography gutterBottom variant="p" component="p">
            {phone}
          </Typography>
        </Box>
        <TagsList list={tags} />
      </CardContent>
      <Divider ligth />
      <Button size="small">
        <Link to={`/breweries/${id}`}>Plus de détails</Link>
      </Button>
    </Card>
  );
}

export default OneBrewerie;
