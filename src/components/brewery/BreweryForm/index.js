import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import {
  Typography,
  Button,
  Container,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";
import Input from "../../Input";
import CustomSearchbar from "../../UI/CustomSearchbar";
import Category from "../../Category";

let isHTTPRequestSend = false;

// Component
function BreweryForm() {
  const isLogged = useSelector((state) => state.user.isLogged);
  const loadingStatus = useSelector((state) => state.loading.status);
  const navigate = useNavigate();
  const breweries = useSelector((state) => state.brewery.breweries);
  const dispatch = useDispatch();
  const params = useParams();
  const [inputStatus, setInputStatus] = useState({
    title: { isValid: false, value: "" },
    image: { file: null, value: "" },
    phone: { isValid: false, value: "" },
    location: { isValid: false, value: null },
    categories: [],
    description: { isValid: false, value: "" },
  });
  let breweryToUpdate = null;

  if (params.id) {
    breweryToUpdate = breweries.find(
      (brewery) => brewery.id === Number(params.id)
    );
  }
  const isFormValid =
    inputStatus.title.isValid &&
    inputStatus.phone.isValid &&
    inputStatus.location.isValid &&
    inputStatus.description.isValid;

  const handleBrewerySubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) return;
    dispatch({
      type: params.id ? "UPDATE_BREWERY" : "ADD_BREWERY",
      id: params.id ? params.id : null,
      title: inputStatus.title.value,
      image: inputStatus.image.file,
      phone: inputStatus.phone.value,
      address: inputStatus.location.value.address,
      lat: inputStatus.location.value.lat,
      lon: inputStatus.location.value.lon,
      categories: inputStatus.categories,
      description: inputStatus.description.value,
    });
    isHTTPRequestSend = true;
  };

  const handleFileChange = (event) => {
    setInputStatus((prevState) => ({
      ...prevState,
      image: { file: event.target.files[0], value: event.target.value },
    }));
  };

  const handleInputChange = useCallback((name, status) => {
    setInputStatus((prevState) => ({
      ...prevState,
      [name]: status,
    }));
  }, []);

  const handleSelectedCategories = useCallback((list) => {
    setInputStatus((prevState) => ({
      ...prevState,
      categories: list,
    }));
  }, []);

  useEffect(() => {
    if (loadingStatus === "success" && isHTTPRequestSend) {
      isHTTPRequestSend = false;
      navigate("/breweries");
    }
  }, [loadingStatus]);

  return (
    <>
      {/* If user is not connected, then we redirect to home page */}
      {!isLogged && <Navigate to="/" />}
      <Container
        component="form"
        onSubmit={handleBrewerySubmit}
        style={{ maxWidth: "600px", color: "gray" }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={() => navigate("/breweries")}>
            <ArrowBackRounded sx={{ fontSize: "3rem", color: "gray" }} />
          </IconButton>
          <Typography variant="h3" component="h2">
            {params.id ? "Modifier La Brasserie" : "Ajouter Une Brasserie"}
          </Typography>
        </Box>

        <Input
          input={{
            type: "text",
            label: "Nom de la brasserie :",
          }}
          selectedValue={breweryToUpdate?.title}
          onInputChange={handleInputChange}
          name="title"
        />
        <TextField
          label="Photo de la brasserie"
          id="image"
          type="file"
          accept="image/png, image/jpeg"
          name="image"
          value={inputStatus.image.value}
          onChange={handleFileChange}
        />
        <Input
          input={{
            type: "tel",
            label: "Numéro de téléphone :",
          }}
          selectedValue={breweryToUpdate?.phone}
          onInputChange={handleInputChange}
          name="phone"
        />
        <CustomSearchbar
          setInputStatus={setInputStatus}
          location={{
            address: breweryToUpdate?.address,
            lat: breweryToUpdate?.lat,
            lon: breweryToUpdate?.lon,
          }}
        />
        <Input
          input={{
            type: "text",
            label: "Description :",
          }}
          selectedValue={breweryToUpdate?.description}
          onInputChange={handleInputChange}
          name="description"
        />
        <Category
          selectedCategories={breweryToUpdate?.categories}
          onSelectedCategories={handleSelectedCategories}
        />
        <Button type="submit">Enregistrer</Button>
      </Container>
    </>
  );
}

export default BreweryForm;
