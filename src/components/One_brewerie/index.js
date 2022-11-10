import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventsBrewery from "../Breweries/EventsBrewery";
import "./style.scss";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import TagsList from "../UI/TagsList";

// Component
function One_brewerie() {
  const { id } = useParams();
  const breweriesList = useSelector((state) => state.brewery.breweries);
  const findBrewery = breweriesList.find((brewery) => {
    return brewery.id === Number(id);
  });

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={findBrewery.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {findBrewery.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ alignItems: "center", marginTop: "2rem" }}
        >
          <LocationOnIcon /> {findBrewery.address}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          <PhoneIcon /> {findBrewery.phone}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: "2rem" }}
        ></Typography>

        <Typography sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          <TagsList list={findBrewery.categories} />
        </Typography>

        <Typography variant="body2" color="text.secondary">
          <EventsBrewery />
        </Typography>
      </CardContent>

      <CardActions>
        <Button component={Link} to="/Brewery/event">
          Gestionnaire d'évènements
        </Button>
      </CardActions>
    </Card>
  );
}

export default One_brewerie;
