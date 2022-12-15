// hook import
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// other import
import Add from "@mui/icons-material/Add";
// component import
import { Link, Navigate } from "react-router-dom";
import { Grid } from "@mui/material";
import BreweryCard from "../BreweryCard";
import CustomModal from "../../UI/CustomModal";
import SimpleModalContent from "../../UI/SimpleModalContent";
// action creator import
import { deleteBrewery } from "../../../actions";
// styled component import
import {
  BreweriesContainer,
  BreweryCardBox,
  NoResultTypography,
  Title,
  TitleButton,
  TitleText,
} from "./style";

let ownerBreweries = [];

// Component
function Breweries() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogged, role } = useSelector((state) => state.user);
  const [breweryId, setBreweryId] = useState(null);
  const userId = useSelector((state) => state.user.id);
  const breweries = useSelector((state) => state.brewery.breweries);
  const dispatch = useDispatch();

  ownerBreweries = breweries?.filter((brewery) => brewery.user_id === userId);

  const handleModal = (id) => {
    setBreweryId(id);
    setIsOpen(true);
  };

  // Delete a brewery by its ID
  const handleBreweryDelete = () => {
    setIsOpen(false);
    if (breweryId && breweryId > 0) {
      const action = deleteBrewery(breweryId);

      dispatch(action);
    }
  };

  return (
    <>
      {/* If user is not connected and not a brewer, then it redirect to home page */}
      {!isLogged && role !== "brewer" && <Navigate to="/" replace />}
      <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <SimpleModalContent
          onValidate={handleBreweryDelete}
          onCancel={() => setIsOpen(false)}
          title="Suppression de la brasserie"
          description="Etes-vous sûr de vouloir supprimer cette brasserie ?"
        />
      </CustomModal>
      <BreweriesContainer>
        <Title>
          <TitleText variant="h4" component="h3">
            Mes brasseries
          </TitleText>
          <TitleButton
            startIcon={<Add />}
            component={Link}
            to="/brewery/breweryForm"
          >
            Ajouter une Brasserie
          </TitleButton>
        </Title>
        {ownerBreweries?.length > 0 ? (
          <BreweryCardBox>
            <Grid component="ul" spacing={2} justifyContent="center" container>
              {ownerBreweries.map((brewery) => (
                <BreweryCard
                  id={brewery.id}
                  key={brewery.id}
                  image={brewery.image}
                  title={brewery.title}
                  address={brewery.address}
                  phone={brewery.phone}
                  onDelete={handleModal}
                />
              ))}
            </Grid>
          </BreweryCardBox>
        ) : (
          <NoResultTypography component="div">
            Aucune brasserie enregistrée.
          </NoResultTypography>
        )}
      </BreweriesContainer>
    </>
  );
}

export default Breweries;
