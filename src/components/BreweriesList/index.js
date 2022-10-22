import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import OneBrewerie from "./OneBrewerie";
import {
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Typography,
} from "@mui/material";
import TagsList from "../UI/TagsList";

let breweriesList;

function BreweriesList({ data }) {
  const [categoryList, setCategoryList] = useState([]);
  const params = useParams();
  const categories = useSelector((state) => state.category.categories);
  console.log(data);
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

  if (data?.length) {
    const filteredBreweriesList = data.filter((brewery) => {
      return (
        brewery.address?.includes(params.value) &&
        hasSelectedTag(brewery, categoryList)
      );
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
    <Container maxWidth={400}>
      <Typography variant="h4" component="div" textAlign="center">
        {`Liste des brasseries (${breweriesList.length})`}
      </Typography>
      <Divider light />
      {categories?.length && (
        <Container sx={{ marginTop: 2 }}>
          <TagsList onTagDelete={handleTagDelete} list={categoryList} />
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="category">
              Filtrer par catégorie :
            </InputLabel>
            <NativeSelect
              defaultValue="Choisir une catégorie"
              id="category"
              onClick={handleOptionSelect}
            >
              <option disabled>Choisir une catégorie</option>
              {categories.map((category) => (
                <option key={category.id} id={category.id} value={category.tag}>
                  {category.tag}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Container>
      )}
      {breweriesList?.length > 0 ? (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            {breweriesList}
          </Grid>
        </Grid>
      ) : (
        <Typography gutterBottom variant="p" component="div">
          Aucun résultat.
        </Typography>
      )}
    </Container>
  );
}

export default BreweriesList;
