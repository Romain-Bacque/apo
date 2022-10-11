// == Import

import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, RadioGroup, FormControlLabel, Radio, Snackbar, Alert, Container } from '@mui/material';
import './style.scss';
import Input from '../Input'

// == Component

function Register() {
  const dispatch = useDispatch();
  const [ inputStatut, setInputStatut ] = useState({
    email: { isValid: false, value: '' },
    password: { isValid: false, value: '' },
    name: { isValid: false, value: '' },
    role: 'user'
  });

  const isFormValid = inputStatut.name.isValid &&
  inputStatut.email.isValid &&
  inputStatut.password.isValid &&
  inputStatut.confirmPassword.isValid
  
  const handleRegister = (event) => {    
    event.preventDefault();
    
    if(!isFormValid) return;

    dispatch({
      type: 'REGISTER',
      email: inputStatut.email.value,
      password: inputStatut.password.value,
      name: inputStatut.name.value,
      role: inputStatut.role
    });  
  };


  const handleInputChange = useCallback((name, statut) => {
    setInputStatut(prevState => {
      return {
        ...prevState,
        [name]: statut
      };
    });
  }, []);
  
  return (
    <>

      <Box component="form" onSubmit={handleRegister} sx={{ bgcolor: 'white', width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem'}}>
        <Typography component='h2' sx={{ marginTop: '4rem', fontSize: '1.5rem', textAlign: 'center' }}>Créer un compte</Typography>

        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', border: 'none' }}>

          <RadioGroup
            defaultValue="user"
            name="role"
            sx={{ display: 'inline-block' }}
          >  
            <FormControlLabel
              label="Particulier"
              value="user"
              onChange={handleInputChange.bind(null, "role", "user")}
              control={<Radio />}
            />
            <FormControlLabel
              label="Brasseur"
              value="brewer"
              onChange={handleInputChange.bind(null, "role", "brewer")}
              control={<Radio />}

            />
          </RadioGroup>

      </Box>
        <Input 
          input={
            {
              id: "name",
              variant: "standard",
              type: 'text',
              label: "Nom ou Pseudo :"
            }
          }
          name='name'
          onInputChange={handleInputChange}
        />
        <Input 
          input={
            {
              id: "email",
              variant: "standard",
              type: 'email',
              label: "Adresse Email :"
            }
          }

          name='email'
          onInputChange={handleInputChange}      
        />
        <Input 

          input={
            {              
              id: "password",
              variant: "standard",
              type: 'password',
              label: "Entrer le mot de passe :"
            }
          }

          name='password'
          onInputChange={handleInputChange}
        />
          <Input 
            input={
              {
                id: "confirmPassword",
                variant: "standard",
                type: 'password',
                label: "Confirmer le mot de passe :"
              }
            }
          name='confirmPassword'
          valueToMatch={inputStatut.password.value}
          onInputChange={handleInputChange}
        />

      <Button
        type="submit"
        disabled={!isFormValid}
        variant="contained">
      S'enregistrer
      </Button>
      <Link to='/login'>Vous êtes déjà enregistré ?</Link>      
    </Box>       
  </>
  );
}

// == Export
export default Register;