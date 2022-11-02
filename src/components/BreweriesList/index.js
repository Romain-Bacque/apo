import { useState } from "react";

import OneBrewerie from "./BrewerieCard";
import { Container, Divider, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Category from "../Category";

let breweriesList;

function BreweriesList({ filter, data }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const hasSelectedTag = (brewery, categoryList) => {
    const filteredList = categoryList.filter((object1) => {
      return brewery.categories.some((object2) => {
        return parseInt(object1.id) === parseInt(object2.id);
      });
    });
    return !!filteredList.length;
  };

  if (data?.length) {
    const filteredBreweriesList = data.filter((brewery) => {
      return hasSelectedTag(brewery, selectedCategories);
    });

    breweriesList = filteredBreweriesList.map((filteredBrewery) => (
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
    <Container sx={{ mt: "1rem", minWidth: "300px", height: "100%" }}>
      <Typography variant="h4" component="h3" textAlign="center">
        {`Liste des brasseries (${breweriesList?.length || 0})`}
      </Typography>
      <Typography color="gray" variant="h6" component="span" textAlign="center">
        {`Filtre(s) appliqué : ${filter ? filter.join(" | ") : "Aucun filtre"}`}
      </Typography>
      <Divider light />
      <Category onSelectedCategories={setSelectedCategories} />
      <Box sx={{ height: "45vh", overflow: "auto" }}>
        {breweriesList?.length > 0 ? (
          <Stack direction="column" gap={2}>
            {breweriesList}
          </Stack>
        ) : (
          <Typography m="1.5rem" textAlign="center" component="div">
            Aucun résultat.
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default BreweriesList;
