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
  const [inputStatut, setInputStatut] = useState({
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
    inputStatut.id.isValid &&
    inputStatut.title.isValid &&
    inputStatut.phone.isValid &&
    inputStatut.description.isValid &&
    inputStatut.address.isValid &&
    inputStatut.lat.isValid &&
    inputStatut.lon.isValid &&
    inputStatut.user_id.isValid;

  const handleEdit = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    dispatch({
      type: "UPDATE_BREWERY",
      id: inputStatut.id.value,
      title: inputStatut.title.value,
      phone: inputStatut.phone.value,
      description: inputStatut.description,
      address: inputStatut.address,
      lat: inputStatut.lat,
      image: inputStatut.image,
      user_id: inputStatut.user_id,
    });
  };

  const handleInputChange = useCallback((name, statut) => {
    setInputStatut((prevState) => {
      return {
        ...prevState,
        [name]: statut,
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
