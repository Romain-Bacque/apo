import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Grid } from "@mui/material";
import "./style.scss";
import { Link } from "react-router-dom";
import TagsList from "../UI/TagsList";

function OneBrewerie({ title, phone, address, tags, image, id }) {
  return (
    <Grid item xs={12} md={4}>
      <Link to={`/breweries/${id}`}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={image}
              alt="green iguana"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>

              <Typography gutterBottom variant="p" component="div">
                {address}
              </Typography>

              <Typography gutterBottom variant="p" component="div">
                {phone}
              </Typography>

              <Typography gutterBottom variant="h5" component="div">
                <TagsList list={tags} />
              </Typography>
            </CardContent>
          </CardActionArea>

          <CardActions />
        </Card>
      </Link>
    </Grid>
  );
}

export default OneBrewerie;
