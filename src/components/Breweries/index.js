// == Import
import './style.scss';
import {Link} from 'react-router-dom'
// == Composant
import Brewerie from './Brewerie'
import Add from '@mui/icons-material/Add';
import {Box, Button, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';


function Breweries() {
  const breweries = useSelector(state => state.data.breweries);
  const idUser = useSelector(state => state.user.id)
  const userBreweries = breweries.filter((brewery) => brewery.user_id === idUser )


  return (
    <>
        <Box>
          <Typography variant='h2'>
            Mes brasseries (1)
          </Typography>
          <Link to='/brewery/form_brewery'>
            <Button variant="contained">Ajouter une Brasserie  <Add /> </Button>
          </Link>
        </Box>
        <Grid container>
        {userBreweries.map((oneBrewery) => (
          <Brewerie 
            key={oneBrewery.id}
            id={oneBrewery.id}
            image={oneBrewery.image}
            title={oneBrewery.title}
          />  

        ))}
        
          
        </Grid>
    </>
  );
}
// == Export
export default Breweries;
