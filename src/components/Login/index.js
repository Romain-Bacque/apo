import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { Button, Typography, Container } from "@mui/material";
import Input from "../Input";

function Login() {
  const isLogged = useSelector((state) => state.user.isLogged);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputStatut, setInputStatut] = useState({
    email: { isValid: false, value: "" },
    password: { isValid: false, value: "" },
  });

  const isFormValid = inputStatut.email.isValid && inputStatut.password.isValid;

  const handleInputChange = useCallback((name, statut) => {
    setInputStatut((prevState) => {
      return {
        ...prevState,
        [name]: statut,
      };
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    dispatch({
      type: "LOGIN",
      email: inputStatut.email.value,
      password: inputStatut.password.value,
    });
  };
  if (isLogged) {
    navigate("/");
  }

  return (
    <Container
      component="form"
      onSubmit={handleSubmit}
      sx={{ marginTop: "0px", marginBottom: "0px", width: "600px" }}
    >
      <Typography variant="h2">Se connecter</Typography>
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
