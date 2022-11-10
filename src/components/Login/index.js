import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { Button, Typography, Container } from "@mui/material";
import Input from "../Input";

// Component
function Login() {
  const dispatch = useDispatch();

  const [inputStatus, setInputStatus] = useState({
    email: { isValid: false, value: "" },
    password: { isValid: false, value: "" },
  });

  const isFormValid = inputStatus.email.isValid && inputStatus.password.isValid;

  const handleInputChange = useCallback((name, status) => {
    setInputStatus((prevState) => {
      return {
        ...prevState,
        [name]: status,
      };
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    dispatch({
      type: "LOGIN",
      email: inputStatus.email.value,
      password: inputStatus.password.value,
    });
  };

  return (
    <Container
      style={{ maxWidth: "600px" }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography component="h2" variant="h3" color="gray">
        Se connecter
      </Typography>
      <Input
        input={{
          id: "email",
          label: "Email",
          type: "email",
        }}
        onInputChange={handleInputChange}
        name="email"
      />
      <Input
        input={{
          id: "password",
          label: "Mot de passe",
          type: "password",
        }}
        onInputChange={handleInputChange}
        name="password"
      />
      <Button type="submit" variant="contained">
        Se connecter
      </Button>
      <Link to="/signup">Vous n'êtes pas enregistré ?</Link>
    </Container>
  );
}

export default Login;
