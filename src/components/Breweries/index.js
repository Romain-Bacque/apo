// == Import
import './style.scss';
import {Link} from 'react-router-dom'
// == Composant
import Brewerie from './Brewerie'
import Add from '@mui/icons-material/Add';
import {Box, Button, Grid, Typography } from '@mui/material';


function Breweries() {
  return (
    <>
        <Box>
          <Typography variant='h2'>
            Mes brasseries (1)
          </Typography>
          <Link to='/brewery/form_brewery'>
            <Button variant="contained">Ajouter une Brasserie  <Add /></Button>
          </Link>
        </Box>
        <Grid container>
          <Brewerie />  
        </Grid>
    </>
  );
}
// == Export
export default Breweries;
