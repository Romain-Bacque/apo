// == Import
import {Typography, Button, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Input from '../Input';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
// == Composant

import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

function Form_brewerie() {
  
  const id = useSelector(state => state.user.id);
  const dispatch = useDispatch();

//======================== GEOAPIFY ===================================


  
  function onSuggectionChange(value) {
    console.log(value);

  }
  
  function preprocessHook(value) {
    return `${value}, Munich, Germany`;
  }
  
  function postprocessHook(feature) {
    return feature.properties.street;
  }
  
  function suggestionsFilter(suggestions) {
    const processedStreets = [];
  
    const filtered = suggestions.filter((value) => {
      if (
        !value.properties.street ||
        processedStreets.indexOf(value.properties.street) >= 0
      ) {
        return false;
      } else {
        processedStreets.push(value.properties.street);
        return true;
      }
    });
  
    return filtered;
  }
  //======================== /GEOAPIFY ===================================

  const [ inputStatut, setInputStatut ] = useState({
    title: { isValid: false, value: '' },
    image: { isValid: true, value: '' },
    phone : { isValid: false, value: '' },
    address : { isValid: false, value: '' },
    description : { isValid: false, value: '' }
  });

  // const isFormValid = inputStatut.title.isValid &&
  // inputStatut.image.isValid &&
  // inputStatut.phone.isValid &&
  // inputStatut.address.isValid &&
  // inputStatut.description.isValid

  const handleAddBrewery = (event) => {  
    event.preventDefault();
    
    //  if(!isFormValid) return;

    dispatch({
      type: 'ADD_BREWERY',
      user_id: id,
      title: inputStatut.title.value,
      image: inputStatut.image.value,
      phone: inputStatut.phone.value,
      address: inputStatut.address.value,
      description: inputStatut.description.value
    });  
  };
  function onPlaceSelect(value) {
    console.log(value.properties);
       dispatch({
        type: 'ADD_BREWERY_GEOLOC',
        lat: value.properties.lat,
        lon: value.properties.lon,
        address: value.properties.formatted
      })
  }
 

  const handleInputChange = useCallback((name, statut) => {
    setInputStatut(prevState => {
      return {
        ...prevState,
        [name]: statut
      };
    });
  }, []);

  return (
    <GeoapifyContext apiKey="99188fa618354504b3ba9155a71fb817">

      <Container component='form' onSubmit={handleAddBrewery} sx={{marginTop: '0px'}}>

        
        <Typography variant='h2'> Ajouter une brasserie </Typography>


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
          <GeoapifyGeocoderAutocomplete
            input={
                  {
                    id: "adress",
                    type: 'text',
                    label: "Adresse :"
                  }
                }
          name='adress'
          onInputChange={handleInputChange}
          placeSelect={onPlaceSelect}
          suggestionsChange={onSuggectionChange}
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
    </GeoapifyContext>

  );
}


// == Export
export default Form_brewerie;
