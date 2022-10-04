// == Import
import './style.scss';
import {Link} from 'react-router-dom'
// == Composant
import Brewerie from './Brewerie'
import Add from '@mui/icons-material/Add';
import { Button, Box, Typography } from '@mui/material';

function Breweries() {
  return (
    <>
        <Box sx={{ marginBottom: '5rem', display: 'flex', gap: '1rem', alignItems: 'center'}}>
          <Typography>
            Mes brasseries (1)
          </Typography>
          <Link to='/brewery/form_brewery'>
            <Button variant="contained" sx={{gap: '1rem'}}>Ajouter une Brasserie  <Add /></Button>
          </Link>
        </Box>

        <Brewerie />  
    </>
  );
}
// == Export
export default Breweries;
