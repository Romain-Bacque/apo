// hook import
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
// other import
import { DeleteForever } from "@mui/icons-material";
import styled from "@emotion/styled";
// component import
import { Navigate } from "react-router-dom";
import { Typography, Button, Container, Divider } from "@mui/material";
import Input from "../Input";
import CustomModal from "../UI/CustomModal";
import SimpleModalContent from "../UI/SimpleModalContent";

// Style
const ProfileContainer = styled(Container)({
  width: "500px",
  maxWidth: "90%",
  padding: "3rem",
  backgroundColor: "white",
  borderRadius: "10px",
  border: "1px solid rgb(230, 230, 230)",
});
const StyledDivider = styled(Divider)({
  margin: "1rem 0",
});
const DeleteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

// Component
function Profile() {
  const actualPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const loading = useSelector((state) => state.loading);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [inputStatus, setInputStatus] = useState({
    name: { isValid: false, value: "" },
    email: { isValid: false, value: "" },
    actualPassword: { isValid: false, value: "" },
    newPassword: { isValid: false, value: "" },
    confirmPassword: { isValid: false, value: "" },
  });

  const isFormValid =
    inputStatus.name.isValid &&
    inputStatus.email.isValid &&
    inputStatus.actualPassword.isValid &&
    inputStatus.newPassword.isValid &&
    inputStatus.confirmPassword.isValid;

  const handleUpdateUser = (event) => {
    event.preventDefault();
    if (!isFormValid) return;
    dispatch({
      type: "UPDATE_USER",
      id: user.id,
      name: inputStatus.name.value,
      email: inputStatus.email.value,
      actualPassword: inputStatus.actualPassword.value,
      newPassword: inputStatus.newPassword.value,
    });
  };

  const handleDeleteUser = () => {
    dispatch({
      id: user.id,
      type: "DELETE_USER",
    });
  };

  const handleInputChange = useCallback((name, status) => {
    setInputStatus((prevState) => ({
      ...prevState,
      [name]: status,
    }));
  }, []);

  // if loading status change then input value are resetted, for more security
  useEffect(() => {
    if (loading.status !== "pending") {
      actualPasswordRef.current.resetValue();
      newPasswordRef.current.resetValue();
      confirmPasswordRef.current.resetValue();
    }
  }, [loading]);

  return (
    <>
      {/* If user is not connected, then we redirect to home page */}
      {!user.isLogged && <Navigate to="/" />}
      {isOpen && (
        <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
          <SimpleModalContent
            onValidate={handleDeleteUser}
            onCancel={() => setIsOpen(false)}
            title="Suppression de votre compte"
            description="Etes-vous sûr de vouloir supprimer définitivement votre compte ?"
          />
        </CustomModal>
      )}
      <ProfileContainer component="form" onSubmit={handleUpdateUser}>
        <Typography component="h2" variant="h3" color="gray">
          Modifier Votre Profil
        </Typography>
        <Input
          input={{
            id: "name",
            type: "text",
            label: "Nom ou Pseudo :",
          }}
          selectedValue={user.name}
          name="name"
          onInputChange={handleInputChange}
        />
        <Input
          input={{
            id: "email",
            type: "email",
            label: "Adresse Email :",
          }}
          selectedValue={user.email}
          name="email"
          onInputChange={handleInputChange}
        />
        <Input
          ref={actualPasswordRef}
          input={{
            id: "actualPassword",
            type: "password",
            label: "Entrer le mot de passe actuel :",
          }}
          name="actualPassword"
          onInputChange={handleInputChange}
        />
        <Input
          ref={newPasswordRef}
          input={{
            id: "newPassword",
            type: "password",
            label: "Entrer le nouveau mot de passe :",
          }}
          name="newPassword"
          onInputChange={handleInputChange}
        />
        <Input
          ref={confirmPasswordRef}
          input={{
            id: "confirmPassword",
            type: "password",
            label: "Confirmer le nouveau mot de passe :",
          }}
          name="confirmPassword"
          valueToMatch={inputStatus.newPassword.value}
          onInputChange={handleInputChange}
        />
        <Button type="submit">Enregistrer les modifications</Button>
        <StyledDivider />
        <DeleteButton
          startIcon={<DeleteForever />}
          onClick={() => setIsOpen(true)}
          variant="outlined"
        >
          Résilier le compte
        </DeleteButton>
      </ProfileContainer>
    </>
  );
}

export default Profile;
