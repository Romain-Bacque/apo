// other import
import PropTypes from "prop-types";
// hook import
import { useEffect, useState } from "react";
// component import
import { Divider, Stack } from "@mui/material";
import BreweryCard from "./BreweryCard";
import Category from "../Category";
// styled component import
import {
  BreweriesListContainer,
  CardBox,
  FilterTypography,
  NoResultTypography,
  TitleTypography,
} from "./style";
import { fetchFavoriteIds } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

let breweriesList = [];

// Component
function BreweriesList({ filter, data }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { favoriteIds } = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  const hasSelectedTag = (brewery, categoryList) => {
    const filteredList = categoryList.filter((object1) => {
      const filteredBrewery = brewery.categories.some(
        (object2) => Number(object1.id) === Number(object2.id)
      );
      return filteredBrewery;
    });
    return !!filteredList.length;
  };

  // Get all user favorites
  useEffect(() => {
    const action = fetchFavoriteIds();

    dispatch(action);
  }, [dispatch]);

  if (data?.length) {
    breweriesList = data
      .filter((brewery) => {
        if (!selectedCategories.length) return true; // If there is no category selected, then filter by category is not applied
        return hasSelectedTag(brewery, selectedCategories); // filter by selected category(ies)
      })
      .map((filteredBrewery) => (
        <BreweryCard
          key={filteredBrewery.id}
          id={filteredBrewery.id}
          title={filteredBrewery.title}
          phone={filteredBrewery.phone}
          address={filteredBrewery.address}
          tags={filteredBrewery.categories}
          image={filteredBrewery.image}
          favoriteIds={favoriteIds}
        />
      ));
  } else breweriesList = [];

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
