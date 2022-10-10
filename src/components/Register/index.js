// == Import
import { Box, Typography, Button, Snackbar, Alert, RadioGroup } from '@mui/material';

import './style.scss';

import Input from '../Input'
import { useDispatch, useSelector} from 'react-redux';
import { useCallback, useState } from 'react';

// == Composant

function Register() {
  const [ inputStatut, setInputStatut ] = useState({
    email: { isValid: false, value: '' },
    password: { isValid: false, value: '' },
    name: { isValid: false, value: '' },
    role: { isValid: false, value: '' }
  });
  const dispatch = useDispatch();
  const registered = useSelector(state => state.user.isRegistered);
  const isFormValid = inputStatut.name.isValid &&
                    inputStatut.email.isValid &&
                    inputStatut.password.isValid &&
                    inputStatut.confirmPassword.isValid &&
                    inputStatut.role.isValid;

  const handleRegister = (event) => {    
    event.preventDefault();

    if(!isFormValid) return;

    dispatch({
      type: 'REGISTER',
    });  
  };

  const handleInputChange = useCallback((name, statut) => {
    console.log(name, statut)

    setInputStatut(prevState => {
      return {
        ...prevState,
        [name]: statut
      };
    });
  }, []);
      console.log(inputStatut)
  return (

    <>
      <Box component="form" onSubmit={handleRegister} sx={{ bgcolor: 'white', display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', padding: '1rem'}}>

        <Typography omponent='h2'> Créer un compte </Typography>

        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', border: 'none'}}>

        <RadioGroup
        defaultValue="user"
        name="role"
        >
          <Input 
            name="role"
            label="Particulier"
            value="user" 
            onInputChange={handleInputChange}
          />

          <Input 
            name="role"
            label="Brasseur"
            value= "brewer"
            onInputChange={handleInputChange}
            />
      </RadioGroup>

        </Box>

        <Input 
          input={
            {
              id: "standard-basic",
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
              id: "standard-basic",
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
              id: "standard-basic",
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
                id: "standard-basic",
                variant: "standard",
                type: 'password',
                label: "Confirmer le mot de passe :"
              }
            }
          name='confirmPassword'
          valueToMatch={inputStatut.password.value}
          onInputChange={handleInputChange}
        />

      <Button disabled={!isFormValid} sx={{width: '100%', marginTop: '2rem'}} variant="contained" type='submit'>S'inscrire</Button>
      </Box>
      <Box component='form' sx={{ bgcolor: 'white', display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', padding: '1rem' }}>
  
     {inputStatut.role.value === "brewer" && ( <>
     <Typography component='h2' sx={{ marginTop: '4rem' }}> Enregistrer une brasserie </Typography><Input
         id="standard-basic"
         variant="standard"
         name='title'
         type='text'
         label="Nom de la brasserie :" /><Input
           id="standard-basic"
           variant="standard"
           name='image'
           type='file'
           accept="image/png, image/jpeg" /><Input
           id="standard-basic"
           variant="standard"
           name='phone'
           type='tel'
           label="Numéro de téléphone :" /><Input
           id="standard-basic"
           variant="standard"
           name='adress'
           type='text'
           label="Adresse :" /><Input
           id="standard-basic"
           variant="standard"
           name='adress'
           type='text'
           label="Description :" />
           </>
            )} 
        {registered && (
          <>
            <Snackbar  autoHideDuration={1000} >
            <Alert  severity="success" sx={{ width: '100%' }}>
              This is a success message!
            </Alert>
            </Snackbar>
          </>
        )}    
      </Box>
    </>
  );
}

// == Export
export default Register;