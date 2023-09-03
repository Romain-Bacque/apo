// hook import
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// component import
import { Typography, Button, Container } from "@mui/material";
import Input from "../../Input";
import AuthContainerThemeProvider from "../AuthContainerThemeProvider";
// action creator import
import { resetPassword } from "../../../actions";

let isResetting = false;

// Component
function Register() {
  const isLogged = useSelector((state) => state.user.isLogged);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [inputStatus, setInputStatus] = useState({
    password: { isValid: false, value: "" },
    confirmPassword: { isValid: false, value: "" },
  });

  const isFormValid =
    inputStatus.password.isValid && inputStatus.confirmPassword.isValid;

  const handleRegister = (event) => {
    event.preventDefault();
    if (!isFormValid) return;

    const action = resetPassword(
      params.id,
      params.token,
      inputStatus.password.value
    );

    dispatch(action);
    isResetting = true;
  };

  const handleInputChange = useCallback((name, status) => {
    setInputStatus((prevState) => ({
      ...prevState,
      [name]: status,
    }));
  }, []);

  // if user password is successfully reinitialized
  useEffect(() => {
    if (loading.status === "success" && isResetting) {
      isResetting = false;
      navigate("/signin");
    }
  }, [loading]);

  return (
    <>
      {/* If user is connected, then we redirect to home page */}
      {isLogged && <Navigate to="/" />}
      <AuthContainerThemeProvider>
        <Container component="form" onSubmit={handleRegister}>
          <Typography component="h2" variant="h3" color="gray">
            Réinitialiser votre mot de passe
          </Typography>
          <Input
            input={useMemo(
              () => ({
                id: "password",
                type: "password",
                label: "Entrer le nouveau mot de passe :",
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
          <Button type="submit">Réinitialiser le mot de passe</Button>
        </Container>
      </AuthContainerThemeProvider>
    </>
  );
}

export default Register;
