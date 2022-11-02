import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Container,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import TagsList from "../UI/TagsList";

function Category({ onSelectedCategories }) {
  const [categoriesList, setCategoriesList] = useState([]);
  const categories = useSelector((state) => state.category.categories);

  const handleOptionSelect = (event) => {
    const { value: tag } = event.target;
    const { options } = event.target;
    const { id } = options[options.selectedIndex];

    if (!id) return; // Prevent to select option with "Choisir une catégorie" value

    if (
      !categoriesList.find((category) => parseInt(category.id) === parseInt(id))
    ) {
      setCategoriesList((prevState) => [...prevState, { id, tag }]);
    }
  };

  const handleTagDelete = (value) => {
    const filteredCategoriesList = categoriesList.filter(
      (category) => category.id !== value.id
    );

    setCategoriesList(filteredCategoriesList);
  };

  useEffect(() => {
    setCategoriesList(categories);
  }, [categories]);

  useEffect(() => {
    onSelectedCategories && onSelectedCategories(categoriesList);
  }, [categoriesList, onSelectedCategories]);

  return (
    categories?.length > 0 && (
      <Container sx={{ marginTop: 2 }}>
        <TagsList onTagDelete={handleTagDelete} list={categoriesList} />
        <FormControl fullWidth>
          <InputLabel
            variant="standard"
            htmlFor="category"
            sx={{ fontSize: "1.5rem" }}
          >
            Quelle catégorie(s) de bière ?
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
    )
  );
}

export default Category;
