import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventsBrewery from '../Breweries/EventsBrewery'
import './style.scss';
import Categories from '../Categories';
import {Link} from 'react-router-dom'

function One_brewerie () {
    return(
    <Card>

      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>

          <Typography gutterBottom variant="h5" component="div">
            La brasserie du zythophile
          </Typography>

          <Typography variant="body2" color="text.secondary">
           <LocationOnIcon /> 131 rue carno 92450 ville
          </Typography>

          <Typography variant="body2" color="text.secondary">
           <PhoneIcon /> 01.30.55.38.20
          </Typography>

          <Typography> Déscription </Typography>

          <Typography>
          Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
          </Typography>

          <Typography variant="body2" color="text.secondary">
           <Categories />
          </Typography>

          <Typography variant="body2" color="text.secondary">
            <EventsBrewery />
          </Typography>

          

        </CardContent>

      </CardActionArea>

      <CardActions>

      <Link to='/Brewery/event'> <Button> Gestionnaire d'évènements </Button> </Link> 
      
      </CardActions>

    </Card>

    );
}

export default One_brewerie;