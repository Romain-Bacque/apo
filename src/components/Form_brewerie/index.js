// == Import
import {Typography, Button, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Input from '../Input';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
// == Composant

function Form_brewerie() {
  const id = useSelector(state => state.user.id);
  const dispatch = useDispatch();

  const [ inputStatut, setInputStatut ] = useState({
    user_id: { isValid: false, value: '' },
    title: { isValid: false, value: '' },
    image: { isValid: true, value: '' },
    phone : { isValid: false, value: '' },
    address : { isValid: false, value: '' },
    description : { isValid: false, value: '' }
  });

  const isFormValid = inputStatut.user_id.isValid &&
  inputStatut.title.isValid &&
  inputStatut.image.isValid &&
  inputStatut.phone.isValid &&
  inputStatut.address.isValid &&
  inputStatut.description.isValid

  const handleAddBrewery = (event) => {    
    event.preventDefault();
    
    if(!isFormValid) return;

    dispatch({
      type: 'ADD_BREWERY',
      user_id: inputStatut.user_id.value,
      title: inputStatut.title.value,
      name: inputStatut.name.value,
      image: inputStatut.image.value,
      phone: inputStatut.phone.value,
      address: inputStatut.address.value,
      description: inputStatut.description.value
    });  
  };

  const handleInputChange = useCallback((name, statut) => {
    setInputStatut(prevState => {
      return {
        ...prevState,
        [name]: statut
      };
    });
  }, []);

  return (
    <Container component='form' onSubmit={handleAddBrewery} sx={{marginTop: '0px'}}>

      
      <Typography variant='h2'> Ajouter une brasserie </Typography>

      <Input 
        input={
              {
                id: "user_id",
                type: 'text',
                label: "user_id",
                value: id
              }
            }
        name='user_id'
        
        onInputChange={handleInputChange}
    
      />

      <Input 
        input={
                {
                  id: "title",
                  type: 'text',
                  label: "Nom de la brasserie :"
                }
              }
        name='title'
        onInputChange={handleInputChange}
    
      />
      <Input
        input={
                {
                  id: "image",
                  type: 'file',
                  accept: 'image/png, image/jpeg'
                }
              }
        name='image'
        variant="standard"
        onInputChange={handleInputChange}
        
    
      />
      <Input
        input={
                {
                  id: "phone",
                  type: 'tel',
                  label: "Numéro de téléphone :"
                }
              }
        name='phone'
        onInputChange={handleInputChange}
      />
        <Input 
          input={
                {
                  id: "adress",
                  type: 'text',
                  label: "Adresse :"
                }
              }
        name='adress'
        onInputChange={handleInputChange}
      />
        <Input
          input={
                {
                  id: "description",
                  type: 'text',
                  label: "Description :"
                }
              }
        name='description'
        onInputChange={handleInputChange}
      />
      <Button 
        type='submit'
      >
        Ajouter
        <AddIcon />
      </Button>
    </Container>

  );
}


// == Export
export default Form_brewerie;
