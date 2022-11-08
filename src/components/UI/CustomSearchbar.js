import { useCallback, useEffect, useRef, useState } from "react";

import { Autocomplete } from "@mui/material";
import { apiConfig } from "../../config/config";
import Input from "../Input";
import { debounce } from "lodash";
import axios from "axios";

const CustomSearchbar = ({ setInputStatus, location }) => {
  const isFirstRender = useRef(true);
  const [selectedValue, setSelectedValue] = useState(null);
  const [breweriesLocations, setBreweriesLocations] = useState([]);
  const getGeoapiData = useRef(
    // 'debounce' prevent API server spamming, and authorize ajax request 500ms after input value stopped change
    debounce(async (value) => {
      let data = [];

      if (value) {
        try {
          const response = await axios.get(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&filter=countrycode:fr&format=json&limit=15&lang=fr&apiKey=${apiConfig.apiKey}`
          );

          if (response.status === 200) {
            data = response.data.results.map((brewery) => ({
              address: brewery.formatted,
              lat: brewery.lat,
              lon: brewery.lon,
            }));
          }
        } catch (err) {
          console.log(err);
        }
      }
      setBreweriesLocations(data);
    }, 300)
  ).current;

  const handleInputChange = useCallback(
    (name, status) => {
      if (!status.isValid) return getGeoapiData(status.value);
      setInputStatus((prevState) => {
        return {
          ...prevState,
          [name]: { isValid: status.isValid, value: selectedValue },
        };
      });
    },
    [getGeoapiData, setInputStatus, selectedValue]
  );

  useEffect(() => {
    getGeoapiData.cancel();
  }, [getGeoapiData]);

  useEffect(() => {
    if (location?.address && isFirstRender.current) {
      setBreweriesLocations([location]);
      isFirstRender.current = false;
    }
  }, [location]);

  return (
    <Autocomplete
      onChange={(_, value) => setSelectedValue(value)}
      onBlur={() => setBreweriesLocations([])}
      options={breweriesLocations}
      getOptionLabel={(option) => (option.address ? option.address : "")} // Display the 'address' property value of each object from the array of object provide in 'options' prop
      defaultValue={location || null}
      renderInput={(params) => (
        <Input
          params={params}
          input={{
            id: "address",
            type: "text",
            label: "Adresse :",
          }}
          selectedValue={selectedValue?.address}
          name="location"
          onInputChange={handleInputChange}
        />
      )}
    />
  );
};

export default CustomSearchbar;
