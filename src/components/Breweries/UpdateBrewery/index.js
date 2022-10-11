// == Import
import {Typography, Button, Container } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import './style.scss';
import Input from '../../Input';
// == Composant


function UpdateBrewery() {
  return (
    <Container component='form' sx={{marginTop: '0px'}}>
      
      <Typography variant='h2'> Modifier la brasserie </Typography>

      <Input
        name='title'
        type='text'
        label="Nom de la brasserie :"
        value="La brasserie de lulu"
    
      />
      <Input
        variant="standard"
        name='image'
        type='file'
        accept="image/png, image/jpeg"
      />
      <Input 
        name='phone'
        type='tel'
        label="Numéro de téléphone :"
        value="01.30.54.38.20"
      />
        <Input
        name='adress'
        type='text'
        label="Adresse :"
        value="11 rue de jacque titie 78320 bois d'arcy"
      />
        <Input
        name='description'
        type='text'
        label="Description :"
        value="Un petit lorem"
      />
      <Button type='submit'>Modifier
        <UpdateIcon />
      </Button>
    </Container>

  );
}

// == Export
export default UpdateBrewery;
