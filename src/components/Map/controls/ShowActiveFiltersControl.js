// other import
import PropTypes from "prop-types";
import styled from "@emotion/styled";
// component import
import {
  List,
  Divider,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@mui/material";

// Style
const StyledList = styled(List)({
  textAlign: "center",
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
});

// Component
function ShowActiveFiltersControl({ getFilters }) {
  const { geoFilter, radiusFilter, searchValue } = getFilters();

  const getDisplayFilters = () => {
    const filtersToDisplay = [];

    if (searchValue) {
      filtersToDisplay.push("Barre de recherche");
    }

    if (geoFilter) {
      filtersToDisplay.push(geoFilter.properties.nom);
    }

    if (radiusFilter) {
      filtersToDisplay.push("Autour de moi");
    }

    return filtersToDisplay.length > 0 ? filtersToDisplay : ["Aucun filtre"];
  };

  // Active Filter functional component
  const filtersList = getDisplayFilters();

  return (
    // Override 'leaflet-bottom' and 'leaflet-left' classes
    <div className="leaflet-bottom leaflet-left">
      <div className="leaflet-control leaflet-bar leaflet-control-layers">
        <StyledList
          component="div"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Filtre(s) Actif
            </ListSubheader>
          }
        >
          <Divider />
          {filtersList?.length > 0
            ? filtersList.map((filter, index) => (
                <ListItem key={index} component="div">
                  <ListItemText primary={filter} />
                  <Divider />
                </ListItem>
              ))
            : null}
        </StyledList>
      </div>
    </div>
  );
}

ShowActiveFiltersControl.propTypes = {
  getFilters: PropTypes.func.isRequired,
};

export default ShowActiveFiltersControl;
