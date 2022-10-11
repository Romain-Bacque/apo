// == Import
import {Typography, Button, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Input from '../Input';
// == Composant

function Form_brewerie() {
  return (
    <Container component='form' sx={{marginTop: '0px'}}>

      
      <Typography varient='h2'> Ajouter une brasserie </Typography>

      <Input 
        name='title'
        type='text'
        placeholder="Nom de la brasserie :"
        label="Nom de la brasserie :"
    
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
      />
        <Input 
        name='adress'
        type='text'
        label="Adresse :"
      />
        <Input
        name='description'
        type='text'
        label="Description :"
      />
      <Button type='submit'>Ajouter
        <AddIcon />
      </Button>
    </Container>

  );
}


// == Export
export default Form_brewerie;
