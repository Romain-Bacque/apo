import "./style.scss";
import { Link, Navigate } from "react-router-dom";
import Brewerie from "./Brewerie";
import Add from "@mui/icons-material/Add";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useState } from "react";
import CustomModal from "../UI/CustomModal";

// Style
const BreweriesContainer = styled(Container)({
  display: "block",
  height: "100%",
  maxWidth: "800px",
});
const Title = styled(Box)({
  padding: "1rem",
  borderBottom: "1px solid rgb(215, 215, 215)",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  gap: 0.5,
});
const TitleText = styled(Typography)(({ theme }) => ({
  flex: 1.5,
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    flex: 1,
  },
}));
const TitleButton = styled(Button)({
  flex: 1,
  fontSize: "1rem",
  marginTop: "1.2rem",
});

let userBreweries = [];

// Component
function Breweries() {
  const [isOpen, setIsOpen] = useState(false);
  const isLogged = useSelector((state) => state.user.isLogged);
  const [breweryId, setBreweryId] = useState(null);
  const userId = useSelector((state) => state.user.id);
  const breweries = useSelector((state) => state.brewery.breweries);
  const dispatch = useDispatch();

  userBreweries = breweries?.filter((brewery) => brewery.user_id === userId);

  const handleModal = (breweryId) => {
    setBreweryId(breweryId);
    setIsOpen(true);
  };

  // Delete a brewery by its ID
  const handleBreweryDelete = (breweryId) => {
    setIsOpen(false);
    if (breweryId && parseInt(breweryId) > 0) {
      dispatch({
        type: "DELETE_BREWERY",
        breweryId,
      });
    }
  };

  // If user is not connected, then it redirect to home page
  if (!isLogged) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onValidate={handleBreweryDelete}
        id={breweryId}
        title="Suppression de la brasserie"
        description="Etes-vous sûr de vouloir supprimer cette brasserie ?"
      />
      <BreweriesContainer>
        <Title>
          <TitleText variant="h4" component="h3">
            Mes brasseries
          </TitleText>
          <TitleButton component={Link} to={"/brewery/breweryForm"}>
            <Add />
            Ajouter une Brasserie
          </TitleButton>
        </Title>
        {userBreweries?.length > 0 ? (
          <Box marginTop="4rem" overflow="auto" height="65vh">
            <Grid spacing={2} justifyContent="center" container>
              {userBreweries.map((brewery) => {
                return (
                  <Brewerie
                    id={brewery.id}
                    key={brewery.id}
                    image={brewery.image}
                    title={brewery.title}
                    address={brewery.address}
                    onDelete={handleModal}
                  />
                );
              })}
            </Grid>
          </Box>
        ) : (
          <Typography m="1.5rem" textAlign="center" component="div">
            Aucune brasserie enregistrée.
          </Typography>
        )}
      </BreweriesContainer>
    </>
  );
}

export default Breweries;
