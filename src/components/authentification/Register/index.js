import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

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
import Input from "../../Input";

let isRegistering = false;

// Component
function Register() {
  const isLogged = useSelector((state) => state.user.isLogged);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
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
    isRegistering = true;
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
      return <Navigate to="/login" replace />;
    }
  }, [loading]);

  // If user is connected, then we redirect to home page
  if (isLogged) {
    return <Navigate to="/" replace />;
  }

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
      <Link to="/signin">Vous êtes déjà enregistré ?</Link>
    </Container>
  );
}

export default Register;
