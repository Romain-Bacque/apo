// hook import
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// other import
import PropTypes from "prop-types";
// component import
import {
  Container,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import TagsList from "../UI/TagsList";

// Component
function Category({ selectedCategories, onSelectedCategories }) {
  const [categoriesList, setCategoriesList] = useState([]);
  const categories = useSelector((state) => state.category.categories);

  const handleOptionSelect = (event) => {
    const { value: tag } = event.target;
    const { options } = event.target;
    const { id } = options[options.selectedIndex];

    if (!id) return; // Prevent to select option with "Choisir une catégorie" value

    if (
      !categoriesList.find((category) => Number(category.id) === Number(id))
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
    onSelectedCategories(categoriesList);
  }, [categoriesList, onSelectedCategories]);

  useEffect(() => {
    if (selectedCategories) {
      const filteredCategories = selectedCategories.filter(
        (selectedCategory) => selectedCategory.id // remove category where id is null
      );

      setCategoriesList(filteredCategories);
    }
  }, [selectedCategories]);

  return (
    categories?.length > 0 && (
      <Container sx={{ marginTop: 2 }}>
        <TagsList list={categoriesList} onTagDelete={handleTagDelete} />
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
            id="category"
            onClick={handleOptionSelect}
          >
            <option key={null} id={null} disabled>
              Choisir une catégorie
            </option>
            {categories.map((category) => (
              <option key={category.id} id={category.id} value={category.tag}>
                {category.tag}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </Container>
    )
  );
}

Category.propTypes = {
  selectedCategories: PropTypes.array,
  onSelectedCategories: PropTypes.func.isRequired,
};

Category.defaultProps = {
  selectedCategories: null,
};

export default memo(Category);
