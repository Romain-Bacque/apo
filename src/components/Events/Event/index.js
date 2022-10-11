// == Import
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './style.scss';
// == Composant
import EventsBrewery from '../../Breweries/EventsBrewery'

function Event() {
  return (
    <Grid item>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />

          <CardContent>

            <Typography variant="h4">
              La brasserie de lulu
            </Typography>

            <Typography variant="body2">
            <LocationOnIcon /> 131 rue carno 92450 ville
            </Typography>

            <EventsBrewery />

          </CardContent>

        </CardActionArea>

        <CardActions>
        
        </CardActions>
      </Card>
    </Grid>

    
  );
}

// == Export
export default Event;
