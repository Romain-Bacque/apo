// == Import
import { Typography, Button, Container } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import "./style.scss";
import Input from "../../Input";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

// == Composant
function UpdateBrewery() {
  const breweries = useSelector((state) => state.brewery.breweries);
  const dispatch = useDispatch();
  const params = useParams();
  const [inputStatus, setInputStatus] = useState({
    id: { isValid: false, value: "" },
    title: { isValid: false, value: "" },
    phone: { isValid: false, value: "" },
    description: { isValid: false, value: "" },
    address: { isValid: false, value: "" },
    lat: { isValid: false, value: "" },
    lon: { isValid: false, value: "" },
    image: { isValid: false, value: "" },
    user_id: { isValid: false, value: "" },
  });

  const brewery = breweries.find(
    (brewery) => brewery.id === parseInt(params.id)
  );
  console.log(brewery);
  const isFormValid =
    inputStatus.id.isValid &&
    inputStatus.title.isValid &&
    inputStatus.phone.isValid &&
    inputStatus.description.isValid &&
    inputStatus.address.isValid &&
    inputStatus.lat.isValid &&
    inputStatus.lon.isValid &&
    inputStatus.user_id.isValid;

  const handleEdit = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    dispatch({
      type: "UPDATE_BREWERY",
      id: inputStatus.id.value,
      title: inputStatus.title.value,
      phone: inputStatus.phone.value,
      description: inputStatus.description,
      address: inputStatus.address,
      lat: inputStatus.lat,
      image: inputStatus.image,
      user_id: inputStatus.user_id,
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
    <Container component="form" onSubmit={handleEdit} sx={{ marginTop: "0px" }}>
      <Typography variant="h2"> Modifier la brasserie </Typography>

      <Input
        input={{
          type: "text",
          label: "Nom de la brasserie :",
          value: brewery.title || "",
        }}
        onInputChange={handleInputChange}
        name="title"
      />
      <Input
        input={{
          required: false,
          variant: "standard",
          type: "text",
          value: brewery.image || "",
          accept: "image/png, image/jpeg",
        }}
        onInputChange={handleInputChange}
        name="image"
      />
      <Input
        input={{
          type: "tel",
          label: "Numéro de téléphone :",
          value: brewery.phone || "",
        }}
        onInputChange={handleInputChange}
        name="phone"
      />
      <Input
        input={{
          type: "text",
          label: "Adresse :",
          value: brewery.address || "",
        }}
        onInputChange={handleInputChange}
        name="adress"
      />
      <Input
        input={{
          type: "text",
          label: "Description :",
          value: brewery.description || "",
        }}
        onInputChange={handleInputChange}
        name="description"
      />
      <Button type="submit">
        Modifier
        <UpdateIcon />
      </Button>
    </Container>
  );
}

// == Export
export default UpdateBrewery;
