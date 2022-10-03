// == Import
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './style.scss';
// == Composant
import { Link } from 'react-router-dom'
function Brewerie() {
  return (
    <Card sx={{ width: '90%' }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Nom de la brasserie
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions sx={{ justifyContent: 'center' }}>

      <Link to='/create-event'>
        <Button size="small" color="primary">
          évènements
        </Button>
      </Link>

      <Link to='/brewery/update'>
        <Button size="small" color="primary">
          Modifier
        </Button>
      </Link>

      
      <Button size="small" color="primary">
        Supprimer
      </Button>

    </CardActions>
  </Card>
);
}
//     <section className="brewerie">
//       <article className='brewerie-list'>
//         <h2 className='title'> Titre de la brasserie </h2>
//         <Link to='/brewery/update' type='submit' className='btn'> Gérer </Link>
//       </article>
//     </section>
//   );
// }

// == Export
export default Brewerie;
