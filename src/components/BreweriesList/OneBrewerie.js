import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './style.scss';
import { Link } from 'react-router-dom'
import Categories from '../Categories';

function OneBrewerie () {
    return(
        <Card sx={{ width: '100%', marginBottom: '1rem' }}>
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

            <Typography gutterBottom variant="h5" component="div">
              <Categories />
            </Typography>

          </CardContent>

        </CardActionArea>

        <CardActions sx={{ justifyContent: 'space-between' }}>
    
          <Link to=''>
            <Button size="small" color="primary">
              Vor les évènements
            </Button>
          </Link>

          <Link to=''>      
            <Button size="small" color="primary">
                Voir la brasserie
            </Button>
          </Link>

        </CardActions>
      </Card>
    );
}

export default OneBrewerie;