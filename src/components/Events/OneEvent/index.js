// == Import
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {Link} from 'react-router-dom';
import './style.scss';
// == Composant

function OneEvent() {
  return (
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
            Les alcolos du dimanche
          </Typography>

          <Typography variant="body2" color="text.secondary">
           <CalendarMonthIcon /> mer 05 oct, 9:00
          </Typography>

          <Typography variant="body2" color="text.secondary">
           <LocationOnIcon /> 131 rue carno 92450 ville
          </Typography>

          <Typography variant="body2" color="text.secondary">
           <PeopleAltIcon />  300 Participants
          </Typography>

          <Typography> Déscription </Typography>

          <Typography>
          Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
          </Typography>

        </CardContent>

      </CardActionArea>

      <CardActions>
        <form>
          <Button variant="contained" type='submit'>Annuler</Button>
          <Link to='/breweries/:name'> <Button variant="contained" type='submit'>Voir la brasserie</Button> </Link>
        </form>
      </CardActions>

    </Card>

    
  );
}

// == Export
export default OneEvent;
