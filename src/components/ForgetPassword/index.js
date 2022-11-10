import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { Button, Typography, Container } from "@mui/material";
import Input from "../Input";

// Component
function ForgetPassword() {
  const dispatch = useDispatch();

  const [inputStatus, setInputStatus] = useState({
    email: { isValid: false, value: "" },
  });

  const isFormValid = inputStatus.email.isValid;

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
      type: "FORGET_PASSWORD",
      email: inputStatus.email.value,
    });
  };

  return (
    <Container
      style={{ maxWidth: "600px" }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography component="h2" variant="h3" color="gray">
        Réinitialisation du mot de passe{" "}
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
      <Button type="submit" variant="contained">
        Envoyer un lien de réinitialisation
      </Button>
    </Container>
  );
}

export default ForgetPassword;
