import { TextField } from "@mui/material";
import useInput from "../hooks/use-input";
import { useEffect } from "react";
import PasswordChecklist from "react-password-checklist";

const Input = (props) => {
  // pour accéder dynamiquement à une propriété d'un objet
  // on utilise la syntaxe crocher obj['prop'] plutôt que la syntaxe point ob.prop
  let errorContent = false,
    helperTextContent = "";

  const { onInputChange, name } = props;

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
      props.name === "confirmPassword"
        ? inputValue === props.valueToMatch.trim()
          ? true
          : false
        : isInputValid;

    if (!onInputChange) return;
    onInputChange &&
      onInputChange(name, { isValid: isMatching, value: inputValue });
  }, [
    onInputChange,
    isInputValid,
    inputValue,
    name,
    props.name,
    props.valueToMatch,
  ]);

  // Not required input
  if (props.name !== "image") {
    errorContent = isInputTouched && !isInputValid ? true : false;
    helperTextContent =
      isInputTouched && !isInputValid ? "Entrée incorrecte." : "";
  }

  useEffect(() => {
    inputValueHandler(props.selectedValue);
  }, [props.selectedValue, inputValueHandler]);

  return (
    <>
      <TextField
        {...props.params}
        error={errorContent}
        helperText={helperTextContent}
        value={inputValue}
        required
        onBlur={inputBlurHandler}
        onChange={inputChangeHandler}
        name={props.name}
        {...props.input}
      />
      {isInputTouched && !isInputValid && props.name === "confirmPassword" && (
        <PasswordChecklist
          rules={["minLength", "number", "capital", "match"]}
          minLength={8}
          value={inputValue}
          valueAgain={props.valueToMatch}
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
};

export default Input;
