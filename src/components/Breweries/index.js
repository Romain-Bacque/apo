import "./style.scss";
import { Link } from "react-router-dom";
import Brewerie from "./Brewerie";
import Add from "@mui/icons-material/Add";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useState } from "react";
import CustomModal from "../UI/CustomModal";

// Style
const StyledButton = styled(Button)({
  width: "50%",
  fontSize: "1rem",
  marginTop: "1.2rem",
});

function Breweries() {
  const [isOpen, setIsOpen] = useState(false);
  const breweries = useSelector((state) => state.brewery.breweries);
  const userId = useSelector((state) => state.user.id);
  const userBreweries = breweries.filter(
    (brewery) => brewery.user_id === userId
  );

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Suppression de la brasserie"
        description="Etes-vous sûr de vouloir supprimer cette brasserie ?"
      />
      <Container sx={{ height: "100%", maxWidth: "800px" }}>
        <Box
          p="1rem"
          borderBottom="1px solid rgb(215, 215, 215)"
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          gap={0.5}
        >
          <Typography sx={{ textAlign: "center" }} variant="h4" component="h3">
            Mes brasseries
          </Typography>
          <StyledButton component={Link} to={"/brewery/form_brewery"}>
            <Add />
            Ajouter une Brasserie
          </StyledButton>
        </Box>
        {breweries?.length > 0 ? (
          <Box marginTop="4rem" overflow="auto" height="100%">
            <Grid spacing={2} textAlign="center" container>
              {breweries.map((brewery) => (
                <Brewerie
                  key={brewery.id}
                  id={brewery.id}
                  image={brewery.image}
                  title={brewery.title}
                  address={brewery.address}
                  setIsOpen={(value) => setIsOpen(value)}
                />
              ))}
            </Grid>
          </Box>
        ) : (
          <Typography m="1.5rem" textAlign="center" component="div">
            Aucun résultat.
          </Typography>
        )}
        {/* {userBreweries?.length > 0 ? (
        <Grid textAlign="center" container>
          {userBreweries.map((oneBrewery) => (
            <Brewerie
              key={oneBrewery.id}
              id={oneBrewery.id}
              image={oneBrewery.image}
              title={oneBrewery.title}
            />
          ))}
        </Grid>
      ) : (
        <Typography m="1.5rem" textAlign="center" component="div">
          Aucun résultat.
        </Typography>
      )} */}
      </Container>
    </>
  );
}
// == Export
export default Breweries;
