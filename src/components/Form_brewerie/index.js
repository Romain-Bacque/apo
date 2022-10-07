// == Import
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { StyledButton } from '../../selector/styles'
// == Composant
import Input from '../Input'
function Form_brewerie() {
  return (
    <Box component='form' sx={{ width: '95%', height: '40rem', bgcolor: 'white', padding: '2rem'}}>


      <Box component='form' sx={{ bgcolor: 'white', display: 'flex', flexDirection: 'column', gap: '2rem'}}>
      
      <Typography omponent='h2'> Ajouter une brasserie </Typography>

      <Input 
        id="standard-basic"
        variant="standard"
        name='title'
        type='text'
        label="Nom de la brasserie :"
    
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
      />
        <Input 
        id="standard-basic"
        variant="standard"
        name='adress'
        type='text'
        label="Adresse :"
      />
        <Input
        id="standard-basic"
        variant="standard"
        name='description'
        type='text'
        label="Description :"
      />
      </Box>
      <StyledButton sx={{width: '100%', marginTop: '2rem'}} type='submit'>Ajouter
        <AddIcon sx={{marginLeft: '1rem'}}/>
      </StyledButton>
    </Box>

  );
}


// == Export
export default Form_brewerie;
