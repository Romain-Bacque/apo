// == Import
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './style.scss';
// == Composant
import EventsBrewery from '../../Breweries/EventsBrewery'

function Event() {
  return (
    <Card sx={{ width: '90%' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />

        <CardContent sx={{alignItems: 'base-line'}}>

          <Typography gutterBottom variant="h5" component="div">
            La brasserie de lulu
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{marginBottom: '2rem'}}>
           <LocationOnIcon /> 131 rue carno 92450 ville
          </Typography>

          <EventsBrewery />

        </CardContent>

      </CardActionArea>

      <CardActions sx={{ justifyContent: 'center'}}>
      
      </CardActions>
    </Card>

    
  );
}

// == Export
export default Event;
