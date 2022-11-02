import { useCallback, useEffect, useRef, useState } from "react";

import { Autocomplete } from "@mui/material";
import { apiConfig } from "../../config/config";
import Input from "../Input";
import { debounce } from "lodash";
import axios from "axios";

const CustomSearchbar = ({ setInputStatus }) => {
  const [selectedValue, setSelectedValue] = useState({});
  const [breweriesLocationList, setBreweriesLocationList] = useState([]);
  const getGeoapiData = useRef(
    // 'debounce' prevent API server spamming, and authorize ajax request 500ms after input value stopped change
    debounce(async (value) => {
      try {
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&filter=countrycode:fr&format=json&limit=15&lang=fr&apiKey=${apiConfig.apiKey}`
        );

        if (response.status === 200) {
          setBreweriesLocationList(
            response.data.results.map((brewery) => ({
              address: brewery.formatted,
              lat: brewery.lat,
              lon: brewery.lon,
            }))
          );
        }
      } catch (err) {
        console.log(err);
      }
    }, 300)
  ).current;

  const handleInputChange = useCallback(
    (_, status) => {
      setInputStatus((prevState) => {
        return {
          ...prevState,
          location: { isValid: status.isValid, value: selectedValue },
        };
      });
      getGeoapiData(status.value);
    },
    [getGeoapiData, setInputStatus, selectedValue]
  );

  useEffect(() => {
    getGeoapiData.cancel();
  }, [getGeoapiData]);

  return (
    <Autocomplete
      freeSolo
      onChange={(_, value) => setSelectedValue(value)}
      onBlur={() => setBreweriesLocationList([])}
      options={breweriesLocationList}
      getOptionLabel={(option) => option.address} // Display the 'address' property value of each object from the array of object provide in 'options' prop
      renderInput={(params) => (
        <Input
          params={params}
          input={{
            id: "address",
            type: "text",
            label: "Adresse",
          }}
          selectedValue={selectedValue}
          name="address"
          onInputChange={handleInputChange}
        />
      )}
    />
  );
};

export default CustomSearchbar;
