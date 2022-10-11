// == Import
import { Box, Button, Container } from '@mui/material';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState, useCallback } from 'react';

import { Box, Button, Typography } from '@mui/material';


// == Composant
import Input from '../Input'

function Login() {
  const dispatch = useDispatch();
  const [ inputStatut, setInputStatut ] = useState({
    email: { isValid: false, value: '' },
    password: { isValid: false, value: '' }
  });

  const isFormValid = inputStatut.email.isValid && inputStatut.password.isValid;

  const handleInputChange = useCallback((name, statut) => {
    setInputStatut(prevState => {
      return {
        ...prevState,
        [name]: statut
      };
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({
      type: 'LOGIN',
      email: inputStatut.email.value,
      password: inputStatut.password.value
    });
  };

  return (
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: '500px', padding: '2rem', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'space-between', gap: '2rem'}}>
        <Typography component='h2' sx={{ marginTop: '4rem', fontSize: '1.5rem', textAlign: 'center' }}>Se connecter</Typography>
        <Input 
          input={
            {
              id: "email",
              variant: "standard",
              label: "Email",
              type: 'email'
          }
        }
          onInputChange={handleInputChange}
          name='email'
        />
        <Input 
        input={
          {
            id: "password",
            variant: "standard",
            label: "Mot de passe",
            type: 'password'
          }
        }
          onInputChange={handleInputChange}
          name='password'
        />      
        <Button
        type="submit"
        disabled={!isFormValid}
        variant="contained">
      Se connecter
      </Button>
        <Link to='/signup'>Vous n'êtes pas enregistré ?</Link>
      </Box>
  );
}

// == Export
export default Login;