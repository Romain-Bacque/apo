import { Autocomplete } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { apiConfig } from "../../config/config";
import Input from "../Input";
import { debounce } from "lodash";
import axios from "axios";

const SearchBar = () => {
  const [addressesList, setAdressesList] = useState([]);
  const getGeoapiData = useRef(
    // 'debounce' prevent API server spamming, and authorize ajax request 500ms after input value stopped change
    debounce(async (value) => {
      try {
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=locality&filter=countrycode:fr&format=json&limit=15&lang=fr&apiKey=${apiConfig.apiKey}`
        );

        if (response.status === 200) {
          setAdressesList(
            response.data.results.map((brewery) => brewery.formatted)
          );
        }
      } catch (err) {
        console.log(err);
      }
    }, 500)
  ).current;

  const handleInputChange = useCallback(
    (_, status) => {
      getGeoapiData(status.value);
    },
    [getGeoapiData]
  );

  useEffect(() => {
    getGeoapiData.cancel();
  }, [getGeoapiData]);
  console.log(addressesList);
  return (
    <Autocomplete
      freeSolo
      options={addressesList}
      renderInput={(params) => (
        <Input
          params={params}
          input={{
            id: "adress",
            type: "text",
            label: "Adresse",
          }}
          name="adress"
          onInputChange={handleInputChange}
        />
      )}
    />
  );
};

export default SearchBar;
