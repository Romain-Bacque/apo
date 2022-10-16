// == Import
import {Typography, Button, Container, TextField } from '@mui/material';
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
    image: { file: null, value: '' },
    phone : { isValid: false, value: '' },
    lat: null,
    lon: null,
    address: '',
    categories: [],
    description : { isValid: false, value: '' }
  });

  const isFormValid = inputStatut.title.isValid &&
  inputStatut.phone.isValid &&
  inputStatut.address &&
  inputStatut.lat &&
  inputStatut.lon &&
  inputStatut.description.isValid

  const handleAddBrewery = (event) => {  
    event.preventDefault();
    
     if(!isFormValid) return;

    dispatch({
      type: 'ADD_BREWERY',
      user_id: id,
      title: inputStatut.title.value,
      image: inputStatut.image.file,
      phone: inputStatut.phone.value,
      lon: inputStatut.lon.value,
      lat: inputStatut.lat.value,
      address: inputStatut.address.value,
      categories: inputStatut.categories,
      description: inputStatut.description.value
    });
  };

  function handlePlaceSelect(value) {
      setInputStatut(prevState => {
        return {
          ...prevState,
          lat: value.properties.lat ? value.properties.lat : null,
          lon: value.properties.lon ? value.properties.lon : null,
          address: value.properties.formatted ? value.properties.formatted : null
        };
      });
  }

  const handleFileChange = (event) => {
    setInputStatut(prevState => {
      return {
        ...prevState,
        image: { file: event.target.files[0], value: event.target.value }
      };
    });
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
        <TextField
          id="image"
          type='file'
          accept='image/png, image/jpeg'
          name='image'
          value={inputStatut.image.value}
          onChange={handleFileChange}        
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
          placeSelect={handlePlaceSelect}
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
