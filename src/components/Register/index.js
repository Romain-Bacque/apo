// == Import
import { Box, Typography, Button, Snackbar, Alert, Container } from '@mui/material';

import './style.scss';

import Input from '../Input'
import { useDispatch, useSelector} from 'react-redux';

// == Composant
import { StyledButton } from '../../selector/styles'

function Register() {


  const dispatch = useDispatch();
  const  getRole = useSelector(state => state.user.role === 'brewer');
  const  registered = useSelector(state => state.user.isRegistered);
  console.log(registered);
  const handleRegister = (evt) => {
    evt.preventDefault();
    dispatch({
      type: 'REGISTER',
    },);
  };

  const handleRole =() =>{
    console.log('Role');
    dispatch({
      type: 'ROLE',
  },);
};
      
  return (

    <Container sx={{marginTop: '100px'}}>
      <Box component="form" onSubmit={handleRegister} sx={{ bgcolor: 'white', display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', padding: '1rem'}}>

        <Typography omponent='h2'> Créer un compte </Typography>

        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', border: 'none'}}>


          <label htmlfor='particulier'> Particulier</label>

          <Input 
            type="radio" 
            id="particulier" 
            name="role" 
            value="user" 
            onclick={handleRole}
          />


          <label htmlfor='particulier'> Brasseur </label>

          <Input 
            type="radio" 
            id="role" 
            name="role" 
            value="brewer" 
            onclick={handleRole}
            />

        </Box>

        <Input 
          id="standard-basic"
          variant="standard"
          name='name'
          type='text'
          label="Nom ou Pseudo :"
        />
        <Input 
          id="standard-basic"
          variant="standard"
          name='email'
          type='email'
          label="adresse email :"
      
        />
        <Input 
          id="standard-basic"
          variant="standard"
          name='password'
          type='password'
          label="Entrer un mot de passe :"
        />
          <Input 
          id="standard-basic"
          variant="standard"
          name='confirm-pass'
          type='password'
          label="comfirmer le mot de passe :"
        />

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
        <StyledButton  sx={{width: '100%', marginTop: '2rem'}} variant="contained" type='submit'>S'inscrire</StyledButton>    
      </Box>
    </Container>
  );
}

// == Export
export default Register;