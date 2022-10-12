import React, { useState } from "react";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const Test = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onPlaceSelect(value) {
    console.log(value);
  }

  function onSuggectionChange(value) {
    console.log(value);
  }

  function preprocessHook(value) {
    return `${value}, Munich, Germany`;
  }

  function postprocessHook(feature) {
    return feature.properties.street;
  }

  function suggestionsFilter(suggestions) {
    const processedStreets = [];

    const filtered = suggestions.filter((value) => {
      if (
        !value.properties.street ||
        processedStreets.indexOf(value.properties.street) >= 0
      ) {
        return false;
      } else {
        processedStreets.push(value.properties.street);
        return true;
      }
    });

    return filtered;
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      const value = e.target.value;
      dispatch({
        type: 'SEARCH_VALUE',
        value: e.target.value,
      })
      navigate(`/search/${value}`)
     
  }
  }

  return (
    <GeoapifyContext apiKey="99188fa618354504b3ba9155a71fb817">

      <GeoapifyGeocoderAutocomplete
        placeholder="Enter address here"
        // value={value}
        // type={type}
        // lang={language}
        // position={position}
        // countryCodes={countryCodes}
        // limit={limit}
        // filterByCountryCode={filterByCountryCode}
        // filterByCircle={filterByCircle}
        // filterByRect={filterByRect}
        // biasByCountryCode={biasByCountryCode}
        // biasByCircle={biasByCircle}
        // biasByRect={biasByRect}
        // biasByProximity={biasByProximity}
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
        // preprocessHook={preprocessHook}
        // postprocessHook={postprocessHook}
        // suggestionsFilter={suggestionsFilter}
      />
    </GeoapifyContext>
  );
};

export default Test;

