import { Typography, Button, Container, TextField } from "@mui/material";
import Input from "../Input";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import CustomSearchbar from "../UI/CustomSearchbar";
import Category from "../Category";

function Form_brewerie() {
  const [inputStatus, setInputStatus] = useState({
    title: { isValid: false, value: "" },
    image: { file: null, value: "" },
    phone: { isValid: false, value: "" },
    location: { isValid: false, value: null },
    categories: [],
    description: { isValid: false, value: "" },
  });
  const dispatch = useDispatch();

  const isFormValid =
    inputStatus.title.isValid &&
    inputStatus.phone.isValid &&
    inputStatus.location &&
    inputStatus.description.isValid;

  const handleAddBrewery = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    dispatch({
      type: "ADD_BREWERY",
      title: inputStatus.title.value,
      image: inputStatus.image.file,
      phone: inputStatus.phone.value,
      address: inputStatus.location.value.address,
      lon: inputStatus.location.value.lon,
      lat: inputStatus.location.value.lat,
      categories: inputStatus.categories,
      description: inputStatus.description.value,
    });
  };

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

  const handleSelectedCategories = useCallback((list) => {
    setInputStatus((prevState) => {
      return {
        ...prevState,
        categories: list,
      };
    });
  }, []);

  return (
    <Container
      component="form"
      onSubmit={handleAddBrewery}
      style={{ maxWidth: "600px", marginTop: "15vh", color: "gray" }}
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
      <CustomSearchbar setInputStatus={setInputStatus} />
      <Input
        input={{
          id: "description",
          type: "text",
          label: "Description :",
        }}
        name="description"
        onInputChange={handleInputChange}
      />
      <Category onSelectedCategories={handleSelectedCategories} />
      <Button type="submit">Enregistrer</Button>
    </Container>
  );
}

export default Form_brewerie;
