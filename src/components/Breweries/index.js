// == Import
import './style.scss';
import {Link} from 'react-router-dom'
// == Composant
import Brewerie from './Brewerie'
import Add from '@mui/icons-material/Add';
import {Box, Typography } from '@mui/material';
import { StyledButton } from '../../selector/styles'

function Breweries() {
  return (
    <>
        <Box sx={{ marginBottom: '5rem', display: 'flex', gap: '1rem', alignItems: 'center'}}>
          <Typography>
            Mes brasseries (1)
          </Typography>
          <Link to='/brewery/form_brewery'>
            <StyledButton variant="contained" sx={{gap: '1rem'}}>Ajouter une Brasserie  <Add /></StyledButton>
          </Link>
        </Box>

        <Brewerie />  
    </>
  );
}
// == Export
export default Breweries;
