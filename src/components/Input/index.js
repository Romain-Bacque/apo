import { TextField } from '@mui/material';
import useInput from '../hooks/use-input'
import { useEffect } from 'react';
import PasswordChecklist from "react-password-checklist"

/*
  Dans un destructuring ou dans les paramètres d'une fonction
  on peut utiliser le rest parameter qui va récupérer toutes les valeurs pas encore récupérée
  dans un tableau, sauf pour du destructuring d'objet ce sera dans un objet
*/


function Input(props) {
  // pour accéder dynamiquement à une propriété d'un objet
  // on utilise la syntaxe crocher obj['prop'] plutôt que la syntaxe point ob.prop
  let errorContent = false,
    helperTextContent = '';
  
  const { onInputChange, name } = props;

  const {
    value: inputValue,
    isValid: isInputValid,
    isTouched: isInputTouched,
    changeHandler: inputChangeHandler,
    blurHandler: inputBlurHandler,
    resetHandler: resetInputHandler,
  } = useInput();

  useEffect(() => {
    const isMatching = props.name === "confirmPassword" ?
        inputValue === props.valueToMatch.trim() ?
        true : false :
        isInputValid;

    if(!onInputChange) return;
      onInputChange && onInputChange(name, { isValid: isMatching, value: inputValue });
  }, [onInputChange, isInputValid, inputValue, name, props.name, props.valueToMatch])

  useEffect(() => {
    if(props.reset) resetInputHandler();
  }, [props.reset, resetInputHandler])

  // Not required input
  if (props.name !== "search" && props.name !== "image") {
    errorContent = isInputTouched && !isInputValid ? true : false;
    helperTextContent = isInputTouched && !isInputValid ? "Entrée incorrecte." : "";
  }
  
  return (
  <>
    <TextField
      error={errorContent}
      helperText={helperTextContent}
      value={inputValue}
      required
      onBlur={inputBlurHandler}
      onChange={inputChangeHandler}
      name={props.name}
      {...props.input}
    />
    {isInputTouched && !isInputValid && props.name === "confirmPassword" &&
      <PasswordChecklist
				rules={["minLength","number","capital","match"]}
				minLength={8}
				value={inputValue}
				valueAgain={props.valueToMatch}
				messages={{
					minLength: "Au moins 8 caractères.",
					number: "Au moins 1 chiffre.",
					capital: "Au moins 1 majuscule.",
					match: "Les mots de passe correspondent.",
				}}
		/>}
  </>
  );
}

export default Input;