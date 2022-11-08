import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
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

let isRegistering = false;

function Register() {
  const loading = useSelector((state) => state.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputStatus, setInputStatus] = useState({
    email: { isValid: false, value: "" },
    password: { isValid: false, value: "" },
    name: { isValid: false, value: "" },
    role: "user",
  });

  const isFormValid =
    inputStatus.name.isValid &&
    inputStatus.email.isValid &&
    inputStatus.password.isValid &&
    inputStatus.confirmPassword.isValid;

  const handleRegister = (event) => {
    event.preventDefault();
    if (!isFormValid) return;
    isRegistering = true;
    dispatch({
      type: "REGISTER",
      email: inputStatus.email.value,
      password: inputStatus.password.value,
      name: inputStatus.name.value,
      role: inputStatus.role,
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

  // if user is successfully registered
  useEffect(() => {
    if (loading.status === "success" && isRegistering) {
      isRegistering = false;
      navigate("/login");
    }
  }, [loading]);

  return (
    <Container
      style={{ maxWidth: "600px" }}
      component="form"
      onSubmit={handleRegister}
    >
      <Typography component="h2" variant="h3" color="gray">
        Créer un compte
      </Typography>

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
        valueToMatch={inputStatus.password.value}
        onInputChange={handleInputChange}
      />

      <Button type="submit">S'enregistrer</Button>
      <Link to="/login">Vous êtes déjà enregistré ?</Link>
    </Container>
  );
}

export default Register;
