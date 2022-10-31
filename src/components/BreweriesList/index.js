import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import OneBrewerie from "./BrewerieCard";
import {
  Container,
  Divider,
  FormControl,
  InputLabel,
  NativeSelect,
  Stack,
  Typography,
} from "@mui/material";
import TagsList from "../UI/TagsList";
import { Box } from "@mui/system";

let breweriesList;

function BreweriesList({ filter, data }) {
  const [categoryList, setCategoryList] = useState([]);
  const categories = useSelector((state) => state.category.categories);

  const hasSelectedTag = (brewery, categoryList) => {
    const filteredList = categoryList.filter((object1) => {
      return brewery.categories.some((object2) => {
        return parseInt(object1.id) === parseInt(object2.id);
      });
    });
    return !!filteredList.length;
  };

  const handleOptionSelect = (event) => {
    const { value: tag } = event.target;
    const { options } = event.target;
    const { id } = options[options.selectedIndex];

    if (!id) return; // Prevent to select option with "Choisir une catégorie" value

    if (
      !categoryList.find((category) => parseInt(category.id) === parseInt(id))
    ) {
      setCategoryList((prevState) => [...prevState, { id, tag }]);
    }
  };

  const handleTagDelete = (value) => {
    const filteredCategoryList = categoryList.filter(
      (category) => category.id !== value.id
    );

    setCategoryList(filteredCategoryList);
  };

  useEffect(() => {
    setCategoryList(categories);
  }, [categories]);

  if (data?.length) {
    const filteredBreweriesList = data.filter((brewery) => {
      return hasSelectedTag(brewery, categoryList);
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
      {categories?.length > 0 && (
        <Container sx={{ marginTop: 2 }}>
          <TagsList onTagDelete={handleTagDelete} list={categoryList} />
          <FormControl fullWidth>
            <InputLabel
              variant="standard"
              htmlFor="category"
              sx={{ fontSize: "1.5rem" }}
            >
              Quelle catégorie(s) de bière vous intéresse ?
            </InputLabel>
            <NativeSelect
              defaultValue="Choisir une catégorie"
              id={"category"}
              onClick={handleOptionSelect}
            >
              <option key={null} id={null} disabled>
                Choisir une catégorie
              </option>
              {categories.map((category) => (
                <option
                  style={{ padding: "1rem" }}
                  key={category.id}
                  id={category.id}
                  value={category.tag}
                >
                  {category.tag}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Container>
      )}
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
