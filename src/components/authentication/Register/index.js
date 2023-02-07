// hook import
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// component import
import {
  Box,
  Typography,
  Button,
  FormControlLabel,
  Radio,
  Container,
} from "@mui/material";
import Input from "../../Input";
import AuthContainerThemeProvider from "../AuthContainerThemeProvider";
// action creator import
import { register } from "../../../actions";
// styled component import
import { AlreadyRegisteredLink, StyledRadioGroup } from "./style";

let isSigningup = false;

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

    const action = register(
      inputStatus.email.value,
      inputStatus.password.value,
      inputStatus.name.value,
      inputStatus.role
    );

    dispatch(action);
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
      <AuthContainerThemeProvider>
        <Container component="form" onSubmit={handleRegister}>
          <Typography component="h2" variant="h4" color="gray">
            Créer Un Compte
          </Typography>
          <Box>
            <StyledRadioGroup defaultValue="user" name="role">
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
            </StyledRadioGroup>
          </Box>
          <Input
            input={useMemo(
              () => ({
                id: "name",
                type: "text",
                label: "Nom ou Pseudo :",
              }),
              []
            )}
            name="name"
            onInputChange={handleInputChange}
          />
          <Input
            input={useMemo(
              () => ({
                id: "email",
                type: "email",
                label: "Adresse Email :",
              }),
              []
            )}
            name="email"
            onInputChange={handleInputChange}
          />
          <Input
            input={useMemo(
              () => ({
                id: "password",
                type: "password",
                label: "Entrer le mot de passe :",
              }),
              []
            )}
            name="password"
            hasConfirmPassword
            valueToMatch={inputStatus.confirmPassword.value}
            onInputChange={handleInputChange}
          />
          <Input
            input={useMemo(
              () => ({
                id: "confirmPassword",
                type: "password",
                label: "Confirmer le mot de passe :",
              }),
              []
            )}
            name="confirmPassword"
            onInputChange={handleInputChange}
          />
          <Button type="submit">S'enregistrer</Button>
          <Box textAlign="center">
            <AlreadyRegisteredLink to="/signin">
              Vous êtes déjà enregistré ?
            </AlreadyRegisteredLink>
          </Box>
        </Container>
      </AuthContainerThemeProvider>
    </>
  );
}

export default Register;
