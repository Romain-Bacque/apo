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
            Les alcolos du dimanche
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{alignItems: 'center', marginTop: '2rem'}}>
           <CalendarMonthIcon /> mer 05 oct, 9:00
          </Typography>

          <Typography variant="body2" color="text.secondary">
           <LocationOnIcon /> 131 rue carno 92450 ville
          </Typography>

          <Typography variant="body2" color="text.secondary">
           <PeopleAltIcon />  300 Participants
          </Typography>

          <Typography sx={{marginTop: '2rem', marginBottom: '2rem'}}> Déscription </Typography>

          <Typography>
          Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
          </Typography>

        </CardContent>

      </CardActionArea>

      <CardActions sx={{ justifyContent: 'center'}}>
        <form>
          <Button variant="contained" type='submit' sx={{marginTop: '1rem', width: '100%', bgcolor: 'red'}}>Annuler</Button>
          <Link to='/breweries/:name'> <Button variant="contained" type='submit' sx={{marginTop: '1rem', width: '100%'}}>Voir la brasserie</Button> </Link>
        </form>
      </CardActions>

    </Card>

    
  );
}

// == Export
export default OneEvent;
