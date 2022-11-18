import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import styled from "@emotion/styled";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
} from "@mui/material";
import Input from "../../Input";

let isSigningup = false;

// Style
const ResetRegisteredLink = styled(Link)({
  fontSize: "0.8rem",
  fontWeight: 700,
  textTransform: "uppercase",
  width: "fit-content",
  color: "#c45d32",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
});

// Component
function Register() {
  const isLogged = useSelector((state) => state.user.isLogged);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputStatus, setInputStatus] = useState({
    name: { isValid: false, value: "" },
    email: { isValid: false, value: "" },
    password: { isValid: false, value: "" },
    confirmPassword: { isValid: false, value: "" },
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
    dispatch({
      type: "REGISTER",
      email: inputStatus.email.value,
      password: inputStatus.password.value,
      name: inputStatus.name.value,
      role: inputStatus.role,
    });
    isSigningup = true;
  };

  const handleInputChange = useCallback((name, status) => {
    setInputStatus((prevState) => ({
      ...prevState,
      [name]: status,
    }));
  }, []);

  // if user is successfully registered
  useEffect(() => {
    if (loading.status === "success" && isSigningup) {
      isSigningup = false;
      navigate("/signin");
    }
  }, [loading]);

  return (
    <>
      {/* If user is connected, then we redirect to home page */}
      {isLogged && <Navigate to="/" />}
      <Container
        style={{ maxWidth: "600px", backgroundColor: "white" }}
        component="form"
        onSubmit={handleRegister}
      >
        <Typography component="h2" variant="h3" color="gray">
          Créer Un Compte
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
              onChange={() => handleInputChange("role", "user")}
              control={<Radio />}
            />
            <FormControlLabel
              label="Brasseur"
              value="brewer"
              onChange={() => handleInputChange("role", "brewer")}
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
        <Box textAlign="center">
          <ResetRegisteredLink to="/signin">
            Vous êtes déjà enregistré ?
          </ResetRegisteredLink>
        </Box>
      </Container>
    </>
  );
}

export default Register;
