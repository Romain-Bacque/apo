import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";

import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
} from "@mui/material";
import "./style.scss";
import Input from "../Input";

function Register() {
  const dispatch = useDispatch();
  const [inputStatut, setInputStatut] = useState({
    email: { isValid: false, value: "" },
    password: { isValid: false, value: "" },
    name: { isValid: false, value: "" },
    role: "user",
  });

  const isFormValid =
    inputStatut.name.isValid &&
    inputStatut.email.isValid &&
    inputStatut.password.isValid &&
    inputStatut.confirmPassword.isValid;

  const handleRegister = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    dispatch({
      type: "REGISTER",
      email: inputStatut.email.value,
      password: inputStatut.password.value,
      name: inputStatut.name.value,
      role: inputStatut.role,
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
    <>
      <Container
        component="form"
        onSubmit={handleRegister}
        sx={{ marginTop: "0px", marginBottom: "0px" }}
      >
        <Typography variant="h2">Créer un compte</Typography>

        <Box>
          <RadioGroup
            defaultValue="user"
            name="role"
            sx={{ display: "inline-block" }}
          >
            <FormControlLabel
              label="Particulier"
              value="user"
              onChange={handleInputChange.bind(null, "role", "user")}
              control={<Radio />}
            />
            <FormControlLabel
              label="Brasseur"
              value="brewer"
              onChange={handleInputChange.bind(null, "role", "brewer")}
              control={<Radio />}
            />
          </RadioGroup>
        </Box>
        <Input
          input={{
            id: "name",
            type: "text",
            label: "Nom ou Pseudo :",
          }}
          name="name"
          onInputChange={handleInputChange}
        />
        <Input
          input={{
            id: "email",
            type: "email",
            label: "Adresse Email :",
          }}
          name="email"
          onInputChange={handleInputChange}
        />
        <Input
          input={{
            id: "password",
            type: "password",
            label: "Entrer le mot de passe :",
          }}
          name="password"
          onInputChange={handleInputChange}
        />
        <Input
          input={{
            id: "confirmPassword",
            type: "password",
            label: "Confirmer le mot de passe :",
          }}
          name="confirmPassword"
          valueToMatch={inputStatut.password.value}
          onInputChange={handleInputChange}
        />

        <Button type="submit">S'enregistrer</Button>
        <Link to="/login">Vous êtes déjà enregistré ?</Link>
      </Container>
    </>
  );
}

// == Export
export default Register;
