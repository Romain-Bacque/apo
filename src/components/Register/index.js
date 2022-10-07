// == Import
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';

import './style.scss';

import Input from '../Input'
import { useDispatch, useSelector} from 'react-redux';
import { useCallback, useState } from 'react';

// == Composant

function Register() {
  const [ isValid, setIsValid ] = useState({});
  const [ passwordValue, setPasswordValue ] = useState('');
  const dispatch = useDispatch();
  const getRole = useSelector(state => state.user.role === 'brewer');
  const registered = useSelector(state => state.user.isRegistered);
  const isFormValid = isValid.name &&
                    isValid.email &&
                    isValid.password &&
                    isValid.confirmPassword &&
                    isValid.role;

  const handleRegister = (event) => {    
    event.preventDefault();

    if(!isFormValid) return;

    dispatch({
      type: 'REGISTER',
    });  
  };

  const handleRole = () =>{
    dispatch({
      type: 'ROLE',
    },);
  };

  const handleInputValidity = useCallback((event) => {
    const { name: inputName } = event.target;
    setIsValid(prevState => {
      return {
        ...prevState,
        [inputName]: true
      };
    });
  }, []);
      
  return (

    <>
      <Box component="form" onSubmit={handleRegister} sx={{ bgcolor: 'white', display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', padding: '1rem'}}>

        <Typography omponent='h2'> Créer un compte </Typography>

        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', border: 'none'}}>


          <label htmlFor='particulier'> Particulier</label>

          <Input 
            type="radio" 
            name="role" 
            value="user" 
            checked={true}
            onClick={handleRole}
          />

          <label htmlFor='particulier'> Brasseur </label>

          <Input 
            type="radio" 
            name="role" 
            value="brewer" 
            onClick={handleRole}
            />

        </Box>

        <Input 
          id="standard-basic"
          variant="standard"
          name='name'
          type='text'
          label="Nom ou Pseudo :"
          onInputValidity={handleInputValidity}
        />
        <Input 
          id="standard-basic"
          variant="standard"
          name='email'
          type='email'
          label="Adresse Email :"
          onInputValidity={handleInputValidity}      
        />
        <Input 
          id="standard-basic"
          variant="standard"
          name='password'
          type='password'
          label="Entrer le mot de passe :"
          onPasswordChange={(value) => setPasswordValue(value)}
          onInputValidity={handleInputValidity}
        />
          <Input 
          id="standard-basic"
          variant="standard"
          name='confirmPassword'
          type='password'
          label="Confirmer le mot de passe :"
          valueToMatch={passwordValue}
          onInputValidity={handleInputValidity}
        />

      <Button  sx={{width: '100%', marginTop: '2rem'}} variant="contained" type='submit'>S'inscrire</Button>
      </Box>
      <Box component='form' sx={{ bgcolor: 'white', display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', padding: '1rem' }}>
  
     { getRole  &&( <>
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