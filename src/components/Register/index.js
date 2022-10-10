// == Import
import { Box, Typography, Button, Snackbar, Alert, RadioGroup, FormControlLabel, Radio, InputLabel } from '@mui/material';

import './style.scss';

import Input from '../Input'
import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';

// == Composant

function Register() {
  const [ inputStatut, setInputStatut ] = useState({
    email: { isValid: false, value: '' },
    password: { isValid: false, value: '' },
    name: { isValid: false, value: '' },
    role: 'user'
  });
  const dispatch = useDispatch();

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
      <Snackbar autoHideDuration={1000} >
        <Alert severity="success" sx={{ width: '100%' }}>
          Vous êtes enregistré avec succès !
        </Alert>
      </Snackbar>
      <Box component="form" onSubmit={handleRegister} sx={{ bgcolor: 'white', display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', padding: '1rem'}}>
        <Typography component='h2' sx={{ marginTop: '4rem', fontSize: '1.5rem', textAlign: 'center' }}> Créer un compte </Typography>

        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', border: 'none'}}>

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
{/* <Box component='form' sx={{ bgcolor: 'white', display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', padding: '1rem' }}> */}
  
  {/* {inputStatut.role === "brewer" && ( 
  <>
    <Typography component='h2' sx={{ marginTop: '2rem', fontSize: '1.5rem', textAlign: 'center' }}> Enregistrer une brasserie </Typography>
    <Input
      input={ 
        {
          id: "brewery",
          variant: "standard",
          type: 'text',
          label: "Nom de la brasserie :"
        } 
      }        
      name='title'
    />
    <InputLabel htmlFor='image'>Image :</InputLabel>
    <Input
      input={
        {
          id: "image",
          variant: "standard",
          type: 'file',
          accept: "image/png, image/jpeg", 
        }
      }
      name='Image :'
      />
    <Input
      input={
        {
          id: "tel",
          variant: "standard",
          type: 'tel',
          label: "Numéro de téléphone :" 
        }
      }
      name='phone'
    />
    <Input
      input={
        {            
          id: "address",
          variant: "standard",
          type: 'text',
          label: "Adresse :"
        }
      }      
      name='address'
    />
    <Input
      input={
        {            
          id: "description",
          type: 'text',
          label: "Description :",
          maxRows: 5,
          multiline: true
        }
      }      
      name='description'
    />
    </>
    )} 
    {registered && (
          <>
            <Snackbar autoHideDuration={1000} >
            <Alert severity="success" sx={{ width: '100%' }}>
              Vous êtes enregistré avec succès !
            </Alert>
            </Snackbar>
          </>
    )}    
    </Box> */}
      <Button
        type="button"
        disabled={!isFormValid}
        variant="contained">
      S'enregistrer
      </Button>      
    </Box>       
  </>
  );
}

// == Export
export default Register;