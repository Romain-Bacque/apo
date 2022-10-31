// == Import
import { Typography, Button, Container, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Input from "../Input";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useState } from "react";
// == Composant

import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

function Form_brewerie() {
  const id = useSelector((state) => state.user.id);
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

  const [inputStatus, setInputStatus] = useState({
    title: { isValid: false, value: "" },
    image: { file: null, value: "" },
    phone: { isValid: false, value: "" },
    lat: null,
    lon: null,
    address: "",
    categories: [],
    description: { isValid: false, value: "" },
  });

  const isFormValid =
    inputStatus.title.isValid &&
    inputStatus.phone.isValid &&
    inputStatus.address &&
    inputStatus.lat &&
    inputStatus.lon &&
    inputStatus.description.isValid;

  const handleAddBrewery = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    dispatch({
      type: "ADD_BREWERY",
      user_id: id,
      title: inputStatus.title.value,
      image: inputStatus.image.file,
      phone: inputStatus.phone.value,
      lon: inputStatus.lon.value,
      lat: inputStatus.lat.value,
      address: inputStatus.address.value,
      categories: inputStatus.categories,
      description: inputStatus.description.value,
    });
  };

  function handlePlaceSelect(value) {
    setInputStatus((prevState) => {
      return {
        ...prevState,
        lat: value.properties.lat ? value.properties.lat : null,
        lon: value.properties.lon ? value.properties.lon : null,
        address: value.properties.formatted ? value.properties.formatted : null,
      };
    });
  }

  const handleFileChange = (event) => {
    setInputStatus((prevState) => {
      return {
        ...prevState,
        image: { file: event.target.files[0], value: event.target.value },
      };
    });
  };

  const handleInputChange = useCallback((name, status) => {
    setInputStatus((prevState) => {
      return {
        ...prevState,
        [name]: status,
      };
    });
  }, []);

  return (
    <GeoapifyContext apiKey="99188fa618354504b3ba9155a71fb817">
      <Container
        component="form"
        onSubmit={handleAddBrewery}
        style={{ maxWidth: "600px", marginTop: "15vh" }}
      >
        <Typography variant="h3" component="h2">
          Ajouter une brasserie
        </Typography>
        <Input
          input={{
            id: "title",
            type: "text",
            label: "Nom de la brasserie :",
          }}
          name="title"
          onInputChange={handleInputChange}
        />
        <TextField
          id="image"
          type="file"
          accept="image/png, image/jpeg"
          name="image"
          value={inputStatus.image.value}
          onChange={handleFileChange}
        />
        <Input
          input={{
            id: "phone",
            type: "tel",
            label: "Numéro de téléphone :",
          }}
          name="phone"
          onInputChange={handleInputChange}
        />
        <GeoapifyGeocoderAutocomplete
          input={{
            id: "adress",
            type: "text",
            label: "Adresse :",
          }}
          name="adress"
          onInputChange={handleInputChange}
          placeSelect={handlePlaceSelect}
        />
        <Input
          input={{
            id: "description",
            type: "text",
            label: "Description :",
          }}
          name="description"
          onInputChange={handleInputChange}
        />
        <Button type="submit">
          Ajouter
          <AddIcon />
        </Button>
      </Container>
    </GeoapifyContext>
  );
}

// == Export
export default Form_brewerie;
