// hook import
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// other import
import { ArrowBackRounded } from "@mui/icons-material";
import styled from "@emotion/styled";
// component import
import {
  Typography,
  Button,
  Container,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import Input from "../../Input";
import CustomSearchbar from "../../UI/CustomSearchbar";
import Category from "../../Category";
// action creator import
import { addBrewery, updateBrewery } from "../../../actions";

let isHTTPRequestSend = false;

// Style
const FormContainer = styled(Container)({
  padding: "2rem",
  width: "600px",
  maxWidth: "90%",
  color: "gray",
  backgroundColor: "white",
  borderRadius: "10px",
});
const SaveButton = styled(Button)({
  marginTop: "2rem",
});

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

  let breweryToUpdate = { address: null, lat: null, lon: null };

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

    const actionContent = {
      id: params.id ? params.id : null,
      title: inputStatus.title.value,
      image: inputStatus.image.file,
      phone: inputStatus.phone.value,
      address: inputStatus.location.value.address,
      lat: inputStatus.location.value.lat,
      lon: inputStatus.location.value.lon,
      categories: inputStatus.categories,
      description: inputStatus.description.value,
    };

    const action = params.id
      ? updateBrewery(actionContent)
      : addBrewery(actionContent);

    dispatch(action);
    isHTTPRequestSend = true;
  };

  const handleFileChange = useCallback((event) => {
    setInputStatus((prevState) => ({
      ...prevState,
      image: { file: event.target.files[0], value: event.target.value },
    }));
  }, []);

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
      <FormContainer component="form" onSubmit={handleBrewerySubmit}>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={() => navigate("/breweries")}>
            <ArrowBackRounded sx={{ fontSize: "3rem", color: "gray" }} />
          </IconButton>
          <Typography variant="h4" component="h2">
            {params.id ? "Modifier La Brasserie" : "Ajouter Une Brasserie"}
          </Typography>
        </Box>
        <Input
          input={useMemo(
            () => ({
              type: "text",
              label: "Nom de la brasserie :",
            }),
            []
          )}
          selectedValue={breweryToUpdate?.title}
          onInputChange={handleInputChange}
          name="title"
        />
        <TextField
          label="Photo de la brasserie"
          InputLabelProps={useMemo(() => ({ shrink: true }), [])}
          id="image"
          type="file"
          accept="image/png, image/jpeg"
          name="image"
          value={inputStatus.image.value}
          onChange={handleFileChange}
        />
        <Input
          input={useMemo(
            () => ({
              type: "tel",
              label: "Numéro de téléphone :",
            }),
            []
          )}
          selectedValue={breweryToUpdate?.phone}
          onInputChange={handleInputChange}
          name="phone"
        />
        <CustomSearchbar
          setInputStatus={setInputStatus}
          location={useMemo(
            () => ({
              address: breweryToUpdate?.address,
              lat: breweryToUpdate?.lat,
              lon: breweryToUpdate?.lon,
            }),
            [breweryToUpdate.address, breweryToUpdate.lat, breweryToUpdate.lon]
          )}
        />
        <Input
          multiline
          input={useMemo(
            () => ({
              type: "text",
              label: "Description :",
            }),
            []
          )}
          selectedValue={breweryToUpdate?.description}
          onInputChange={handleInputChange}
          name="description"
        />
        <Category
          selectedCategories={breweryToUpdate?.categories}
          onSelectedCategories={handleSelectedCategories}
        />
        <SaveButton type="submit">Enregistrer</SaveButton>
      </FormContainer>
    </>
  );
}

export default BreweryForm;
