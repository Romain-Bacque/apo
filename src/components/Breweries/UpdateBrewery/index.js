// == Import
import { Box, Typography, Button } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import './style.scss';
import Input from '../../Input'
// == Composant
import { StyledButton } from '../../../selector/styles'

function UpdateBrewery() {
  return (
    <Box component='form' sx={{ width: '95%', height: '40rem', bgcolor: 'white', padding: '2rem'}}>


      <Box component='form' sx={{ bgcolor: 'white', display: 'flex', flexDirection: 'column', gap: '2rem'}}>
      
      <Typography omponent='h2'> Modifier la brasserie </Typography>

      <Input 
        id="standard-basic"
        variant="standard"
        name='title'
        type='text'
        label="Nom de la brasserie :"
        value="La brasserie de lulu"
    
      />
      <Input 
        id="standard-basic"
        variant="standard"
        name='image'
        type='file'
        accept="image/png, image/jpeg"
      />
      <Input 
        id="standard-basic"
        variant="standard"
        name='phone'
        type='tel'
        label="Numéro de téléphone :"
        value="01.30.54.38.20"
      />
        <Input 
        id="standard-basic"
        variant="standard"
        name='adress'
        type='text'
        label="Adresse :"
        value="11 rue de jacque titie 78320 bois d'arcy"
      />
        <Input
        id="standard-basic"
        variant="standard"
        name='adress'
        type='text'
        label="Description :"
        value="Un petit lorem"
      />
      </Box>
      <StyledButton sx={{width: '100%', marginTop: '2rem'}} variant="contained" type='submit'>Modifier
        <UpdateIcon sx={{marginLeft: '1rem'}}/>
      </StyledButton>
    </Box>

  );
}

// == Export
export default UpdateBrewery;
