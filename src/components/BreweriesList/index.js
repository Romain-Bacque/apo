import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import OneBrewerie from "./OneBrewerie";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Typography,
} from "@mui/material";
import TagsList from "../UI/TagsList";

let breweriesList;

function BreweriesList() {
  const [categoryList, setCategoryList] = useState([]);
  const params = useParams();
  const breweries = useSelector((state) => state.brewery.breweries);
  const categories = useSelector((state) => state.category.categories);

  const hasSelectedTag = (brewery, categoryList) => {
    const filteredList = categoryList.filter((object1) => {
      return brewery.categories.some((object2) => {
        return parseInt(object1.id) === parseInt(object2.id);
      });
    });

    if (filteredList.length) {
      return true;
    } else return false;
  };

  const handleOptionSelect = (event) => {
    const { value: tag } = event.target;
    const { options } = event.target;
    const { id } = options[options.selectedIndex];

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

  if (breweries?.length) {
    breweriesList = breweries.filter((brewery) => {
      return (
        brewery.address.includes(params.value) &&
        hasSelectedTag(brewery, categoryList)
      );
    });
  }

  return (
    <Box sx={{ maxWidth: 550 }}>
      {categories?.length && (
        <Box>
          <TagsList onTagDelete={handleTagDelete} list={categoryList} />
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="category">
              Filtrer par catégorie :
            </InputLabel>
            <NativeSelect
              defaultValue={"Choisir une categorie"}
              id="category"
              onClick={handleOptionSelect}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
            >
              <option disabled>Choisir une categorie</option>
              {categories.map((category) => (
                <option key={category.id} id={category.id} value={category.tag}>
                  {category.tag}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Box>
      )}
      {breweriesList?.length > 0 ? (
        <Grid container spacing={2}>
          {breweriesList.map((filteredData) => (
            <OneBrewerie
              key={filteredData.id}
              id={filteredData.id}
              title={filteredData.title}
              phone={filteredData.phone}
              address={filteredData.address}
              tags={filteredData.categories}
              image={filteredData.image}
            />
          ))}
        </Grid>
      ) : (
        <Typography gutterBottom variant="p" component="div">
          Aucun résultat.
        </Typography>
      )}
    </Box>
  );
}

export default BreweriesList;
