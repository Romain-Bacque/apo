import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Typography, Button, Container } from "@mui/material";
import Input from "../../Input";

let isResetting = false;

// Component
function Register() {
  const loading = useSelector((state) => state.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [inputStatus, setInputStatus] = useState({
    password: { isValid: false, value: "" },
    confirmPassword: { isValid: false, value: "" },
  });

  const isFormValid =
    inputStatus.password.isValid && inputStatus.confirmPassword.isValid;

  const handleRegister = (event) => {
    event.preventDefault();
    if (!isFormValid) return;
    dispatch({
      type: "RESET_PASSWORD",
      id: params.id,
      token: params.token,
      password: inputStatus.password.value,
    });
    isResetting = true;
  };

  const handleInputChange = useCallback((name, status) => {
    setInputStatus((prevState) => {
      return {
        ...prevState,
        [name]: status,
      };
    });
  }, []);

  // if user password is successfully reinitialized
  useEffect(() => {
    if (loading.status === "success" && isResetting) {
      isResetting = false;
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
        Réinitialiser votre mot de passe
      </Typography>
      <Input
        input={{
          id: "password",
          type: "password",
          label: "Entrer le nouveau mot de passe :",
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
      <Button type="submit">Réinitialiser le mot de passe</Button>
    </Container>
  );
}

export default Register;
