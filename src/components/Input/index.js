import { FormControlLabel, Radio, TextField } from '@mui/material';
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

  const { onInputChange, name } = props;

  const {
    value: inputValue,
    isValid: inputIsValid,
    isTouched: inputIsTouched,
    changeHandler: inputChangeHandler,
    blurHandler: inputBlurHandler,
    resetHandler: resetInputHandler,
  } = useInput();

  useEffect(() => {
    if(!onInputChange) return
      onInputChange && onInputChange(name, { isValid: inputIsValid, value: inputValue })
  }, [onInputChange, inputIsValid, inputValue, name])

  useEffect(() => {
    if(props.reset) resetInputHandler();
  }, [props.reset, resetInputHandler])

  return (
    <>
      {name === "role" && (
      <FormControlLabel
        label={props.label}
        value={props.value}
        control={<Radio />}
        onChange={inputChangeHandler}
        {...props.input}
      />
    )}
    {name !== "role" && <TextField
      value={inputValue}
      required
      onBlur={inputBlurHandler}
      onChange={inputChangeHandler}
      name={props.name}
      {...props.input}
    />}
    {inputIsTouched && props.name === "confirmPassword" &&
      <PasswordChecklist
				rules={["minLength","number","capital","match"]}
				minLength={8}
				value={inputValue}
				valueAgain={props.valueToMatch}
				messages={{
					minLength: "Au moin 8 caractères.",
					number: "Au moin 1 chiffre.",
					capital: "Au moin 1 majuscule.",
					match: "Les mots de passe correspondent.",
				}}
			/>}
    </>
  );
}

export default Input;
