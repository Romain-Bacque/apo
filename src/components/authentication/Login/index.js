import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import { Link, Button, Typography, Container, Box } from "@mui/material";
import Input from "../../Input";

// Component
function Login() {
  const isLogged = useSelector((state) => state.user.isLogged);
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
    <>
      {/* If user is connected, then we redirect to home page */}
      {isLogged && <Navigate to="/" />}
      <Container
        style={{ maxWidth: "600px" }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography component="h2" variant="h3" color="gray">
          Se Connecter
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
        <Link
          fontSize="1rem"
          width="fit-content"
          color="#c45d32"
          underline="hover"
          href="/forget-password"
        >
          Mot de passe perdu
        </Link>
        <Button type="submit" variant="contained">
          Se connecter
        </Button>
        <Box textAlign="center">
          <Link
            fontWeight="bold"
            width="fit-content"
            variant="button"
            underline="hover"
            color="#c45d32"
            href="/signup"
          >
            Vous n'êtes pas enregistré ?
          </Link>
        </Box>
      </Container>
    </>
  );
}

export default Login;