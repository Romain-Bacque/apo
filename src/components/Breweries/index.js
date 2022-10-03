// == Import
import './style.scss';
import {Link} from 'react-router-dom'
// == Composant
import Brewerie from './Brewerie'
import AccountMenu from '../Account/AccountMenu';
import Add from '@mui/icons-material/Add';
import { Button, Box } from '@mui/material';

function Breweries() {
  return (
    <>
      <AccountMenu />
      
        <Box sx={{ marginBottom: '5rem'}}>
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
