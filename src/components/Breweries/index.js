import "./style.scss";
import { Link } from "react-router-dom";
import Brewerie from "./Brewerie";
import Add from "@mui/icons-material/Add";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import CustomModal from "../UI/CustomModal";
import Loader from "../UI/loader";
import { textAlign } from "@mui/system";

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
const TitleText = styled(Typography)({
  flex: 1,
  textAlign: "center",
});
const TitleButton = styled(Button)({
  flex: 1,
  fontSize: "1rem",
  marginTop: "1.2rem",
});

let isDeleting = false;
let userBreweries = [];

function Breweries() {
  const [isOpen, setIsOpen] = useState(false);
  // const [userBreweries, setUserBreweries] = useState([]);
  const [breweryId, setBreweryId] = useState(null);
  const userId = useSelector((state) => state.user.id);
  const loading = useSelector((state) => state.loading);
  const breweries = useSelector((state) => state.brewery.breweries);
  const dispatch = useDispatch();

  userBreweries = breweries.filter((brewery) => brewery.user_id === userId);

  const handleModal = (breweryId) => {
    setBreweryId(breweryId);
    setIsOpen(true);
  };

  // Delete a brewery by its ID
  const handleBreweryDelete = (breweryId) => {
    setIsOpen(false);
    if (breweryId && parseInt(breweryId) > 0) {
      isDeleting = true;
      dispatch({
        type: "DELETE_BREWERY",
        breweryId,
      });
    }
  };

  useEffect(() => {
    if (loading.status === "info" && isDeleting) {
      isDeleting = false;
      dispatch({
        type: "FETCH_BREWERIES",
      });
    }
  }, [loading, dispatch]);

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
      {loading.status === "pending" && <Loader />}
      <BreweriesContainer>
        <Title>
          <TitleText variant="h4" component="h3">
            Mes brasseries
          </TitleText>
          <TitleButton component={Link} to={"/brewery/form_brewery"}>
            <Add />
            Ajouter une Brasserie
          </TitleButton>
        </Title>
        {breweries?.length > 0 ? (
          <Box marginTop="4rem" overflow="auto" height="65vh">
            <Grid spacing={2} textAlign="center" container>
              {breweries.map((brewery) => (
                <Brewerie
                  key={brewery.id}
                  id={brewery.id}
                  image={brewery.image}
                  title={brewery.title}
                  address={brewery.address}
                  onDelete={handleModal}
                />
              ))}
            </Grid>
          </Box>
        ) : (
          <Typography m="1.5rem" textAlign="center" component="div">
            Aucun résultat.
          </Typography>
        )}
      </BreweriesContainer>
    </>
  );
}

export default Breweries;
