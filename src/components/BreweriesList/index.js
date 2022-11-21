// other import
import PropTypes from "prop-types";
import styled from "@emotion/styled";
// hook import
import { useState } from "react";
// component import
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import OneBrewerie from "./BrewerieCard";
import Category from "../Category";

let breweriesList;

// Style
const BreweriesListContainer = styled(Container)({
  minWidth: "300px",
  height: "100%",
});
const CardBox = styled(Box)({
  padding: "0.6rem",
  marginTop: "1rem",
  height: "45vh",
  overflow: "auto",
});
const TitleTypography = styled(Typography)({
  textAlign: "center",
});
const FilterTypography = styled(Typography)({
  color: "gray",
  textAlign: "center",
});
const NoResultTypography = styled(Typography)({
  m: "1.5rem",
  textAlign: "center",
});

// Component
function BreweriesList({ filter, data }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const hasSelectedTag = (brewery, categoryList) => {
    const filteredList = categoryList.filter((object1) => {
      const filteredBrewery = brewery.categories.some(
        (object2) => Number(object1.id) === Number(object2.id)
      );
      return filteredBrewery;
    });
    return !!filteredList.length;
  };

  if (data?.length) {
    breweriesList = data
      .filter((brewery) => {
        if (!selectedCategories.length) return true; // If there is no category selected, then filter by category is not applied
        return hasSelectedTag(brewery, selectedCategories); // filter by selected category(ies)
      })
      .map((filteredBrewery) => (
        <OneBrewerie
          key={filteredBrewery.id}
          id={filteredBrewery.id}
          title={filteredBrewery.title}
          phone={filteredBrewery.phone}
          address={filteredBrewery.address}
          tags={filteredBrewery.categories}
          image={filteredBrewery.image}
        />
      ));
  }

  return (
    <BreweriesListContainer>
      <TitleTypography variant="h4" component="h3">
        {`Liste des brasseries (${breweriesList?.length || 0})`}
      </TitleTypography>
      <FilterTypography variant="h6" component="span">
        {`Filtre(s) appliqué : ${filter ? filter.join(" | ") : "Aucun filtre"}`}
      </FilterTypography>
      <Divider light />
      <Category onSelectedCategories={setSelectedCategories} />
      <CardBox>
        {breweriesList?.length > 0 ? (
          <Stack direction="column" gap={2}>
            {breweriesList}
          </Stack>
        ) : (
          <NoResultTypography variant="div" component="p">
            Aucun résultat.
          </NoResultTypography>
        )}
      </CardBox>
    </BreweriesListContainer>
  );
}

BreweriesList.propTypes = {
  filter: PropTypes.array,
  data: PropTypes.array,
};

BreweriesList.defaultProps = {
  filter: null,
  data: null,
};

export default BreweriesList;
