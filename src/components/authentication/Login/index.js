// hook import
import { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// component import
import { Navigate } from "react-router-dom";
import { Button, Typography, Container, Box } from "@mui/material";
import Input from "../../Input";
import AuthContainerThemeProvider from "../AuthContainerThemeProvider";
// action creator import
import { login } from "../../../actions";
// styled component import
import { ResetNotRegisteredLink, ResetPasswordLink } from "./style";

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
    setInputStatus((prevState) => ({
      ...prevState,
      [name]: status,
    }));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) return;

    const action = login(inputStatus.email.value, inputStatus.password.value);

    dispatch(action);
  };

  return (
    <>
      {/* If user is connected, then we redirect to home page */}
      {isLogged && <Navigate to="/" />}
      <AuthContainerThemeProvider>
        <Container component="form" onSubmit={handleSubmit}>
          <Typography component="h2" variant="h4" color="gray">
            Se Connecter
          </Typography>
          <Input
            input={useMemo(
              () => ({
                id: "email",
                label: "Email",
                type: "email",
              }),
              []
            )}
            onInputChange={handleInputChange}
            name="email"
          />
          <Input
            input={useMemo(
              () => ({
                id: "password",
                label: "Mot de passe",
                type: "password",
              }),
              []
            )}
            onInputChange={handleInputChange}
            name="password"
          />
          <ResetPasswordLink to="/forgot-password">
            Mot de passe perdu
          </ResetPasswordLink>
          <Button type="submit" variant="contained">
            Se connecter
          </Button>
          <Box textAlign="center">
            <ResetNotRegisteredLink to="/signup">
              Vous n'êtes pas enregistré ?
            </ResetNotRegisteredLink>
          </Box>
        </Container>
      </AuthContainerThemeProvider>
    </>
  );
}

export default Login;
