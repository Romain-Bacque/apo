/* eslint-disable no-unneeded-ternary */
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import useInput from '../hooks/use-input'
import { useEffect } from 'react';
import PasswordChecklist from "react-password-checklist"

/*
  Dans un destructuring ou dans les paramètres d'une fonction
  on peut utiliser le rest parameter qui va récupérer toutes les valeurs pas encore récupérée
  dans un tableau, sauf pour du destructuring d'objet ce sera dans un objet
*/
function Input({ reset, name }, props) {
  // pour accéder dynamiquement à une propriété d'un objet
  // on utilise la syntaxe crocher obj['prop'] plutôt que la syntaxe point ob.prop

  const {
    value: inputValue,
    isValid: inputIsValid,
    isTouched: inputIsTouched,
    changeHandler: inputChangeHandler,
    blurHandler: inputBlurHandler,
    resetHandler: resetInputHandler,
  } = useInput();

  const handleInputChange = () => {
    if(inputIsTouched) props.onPasswordChange();

    props.onInputValidity();

    inputChangeHandler();
  }

  useEffect(() => {
    if(reset) resetInputHandler();
  }, [reset, resetInputHandler])

  return (
    <>
    <TextField
      value={inputValue}
      onBlur={inputBlurHandler}
      onChange={handleInputChange}
      {...props} // j'utilise le spread operator pour déverser le reste des props sur mon input
    />
    {inputIsTouched && name === "confirmPassword" &&
      <PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={8}
				value={inputValue}
				valueAgain={props.valueToMatch}
				messages={{
					minLength: "Au moin 8 caractères.",
					number: "Au moin 1 chiffre.",
					capital: "Au moin 1 majuscule.",
					match: "Les mots de passe ne correspondent pas.",
				}}
			/>}
    </>
  );
}

// je rend l'info name obligatoire
// elle me servira de critère pour savoir quelle info récupérer dans le state
Input.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Input;
