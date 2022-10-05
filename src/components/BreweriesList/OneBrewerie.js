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
      <Link to='/breweries/:name'>
      
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
                La brasserie de Lulu
              </Typography>

              <Typography gutterBottom variant="p" component="div">
                11 rue jacque tatie
              </Typography>

              <Typography gutterBottom variant="p" component="div">
                01.30.54.38.20
              </Typography>

              <Typography gutterBottom variant="h5" component="div">
                <Categories />
              </Typography>

            </CardContent>

          </CardActionArea>

          <CardActions />

        </Card>

      </Link>

    );
}

export default OneBrewerie;