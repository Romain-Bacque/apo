import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions } from '@mui/material';
import './style.scss';
import { Link } from 'react-router-dom'
import Categories from '../Categories'



function OneBrewerie ({ title, phone, address, tags}) {



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
                {title}
              </Typography>

              <Typography gutterBottom variant="p" component="div">
                {address}
              </Typography>

              <Typography gutterBottom variant="p" component="div">
                {phone}
              </Typography>

              <Typography gutterBottom variant="h5" component="div">
              <Categories tags={tags} />
              </Typography>

            </CardContent>

          </CardActionArea>

          <CardActions />

        </Card>

      </Link>

    );
}

export default OneBrewerie;