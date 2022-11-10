import { forwardRef, useEffect, useImperativeHandle } from "react";
import useInput from "../hooks/use-input";

import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import PasswordChecklist from "react-password-checklist";

// Component
const Input = forwardRef(
  (
    { name, onInputChange, valueToMatch, selectedValue, input, params },
    ref
  ) => {
    let errorContent = false,
      helperTextContent = "";
    const {
      value: inputValue,
      isValid: isInputValid,
      isTouched: isInputTouched,
      valueHandler: inputValueHandler,
      changeHandler: inputChangeHandler,
      blurHandler: inputBlurHandler,
    } = useInput();

    useEffect(() => {
      const isMatching =
        name === "confirmPassword"
          ? inputValue === valueToMatch.trim()
            ? true
            : false
          : isInputValid;

      onInputChange(name, { isValid: isMatching, value: inputValue });
    }, [onInputChange, isInputValid, inputValue, name, valueToMatch]);

    if (name !== "image") {
      errorContent = isInputTouched && !isInputValid ? true : false;
      helperTextContent =
        isInputTouched && !isInputValid ? "Entrée incorrecte." : "";
    }

    // Selected value is directly set if we choose an adress in custom searchbar
    // Or when update brewery form appear, all inputs are directly filled by brewery data
    useEffect(() => {
      inputValueHandler(selectedValue);
    }, [selectedValue, inputValueHandler]);

    return (
      <>
        <TextField
          {...params}
          {...input}
          error={errorContent}
          helperText={helperTextContent}
          value={inputValue}
          required
          onBlur={inputBlurHandler}
          onChange={inputChangeHandler}
          name={name}
        />
        {isInputTouched && !isInputValid && name === "confirmPassword" && (
          <PasswordChecklist
            rules={["minLength", "number", "capital", "match"]}
            minLength={8}
            value={inputValue}
            valueAgain={valueToMatch}
            messages={{
              minLength: "Au moins 8 caractères.",
              number: "Au moins 1 chiffre.",
              capital: "Au moins 1 majuscule.",
              match: "Les mots de passe correspondent.",
            }}
          />
        )}
      </>
    );
  }
);

Input.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  valueToMatch: PropTypes.string,
  selectedValue: PropTypes.string,
  input: PropTypes.any.isRequired,
};

export default Input;
