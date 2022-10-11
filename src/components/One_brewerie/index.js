import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventsBrewery from '../Breweries/EventsBrewery';
import './style.scss';
import Categories from '../Categories';
import { useSelector } from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import { findBrewery, findId } from '../../selector/search/index'

function One_brewerie () {
  const  { id }  = useParams();
  const breweriesList = useSelector ((state) => state.data.breweries)
  const findBrewery = breweriesList.find(brewery => {
    return brewery.id === Number(id);
  });
  console.log(findBrewery)
  
    return(
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={5}>
          <Card>

            <CardActionArea>
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

                <Typography variant="body2" color="text.secondary" sx={{alignItems: 'center', marginTop: '2rem'}}>
                <LocationOnIcon /> {findBrewery.address}

                </Typography>

                <Typography variant="body2" color="text.secondary">
                <PhoneIcon /> {findBrewery.phone}
                </Typography>



          <Typography variant="body2" color="text.secondary" sx={{marginTop: '2rem'}}>
            <Categories tags={findBrewery.categories}/>
          </Typography>

                <Typography sx={{marginTop: '2rem', marginBottom: '2rem'}}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </Typography>



                <Typography variant="body2" color="text.secondary">
                <Categories tags={findBrewery.categories}/>

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

        </Grid>
      </Grid>

    );
}

export default One_brewerie;