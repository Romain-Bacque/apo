// == Import
import { Box, Typography, Button } from '@mui/material';

import './style.scss';

import Input from '../Input'
import { useDispatch, useSelector } from 'react-redux';

// == Composant

function Register() {



  const dispatch = useDispatch();
  const isRegistered = useSelector((state) => state.user.isRegistered);

  const handleRegister = (evt) => {
    dispatch({
      type: 'REGISTER_SUCCCESS',
    });
  };
                
  return (

    <>

      <Box sx={{  bgcolor: 'white', display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', padding: '1rem'}}>

        <Typography omponent='h2'> Créer un compte </Typography>

        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', border: 'none'}}>

          <label htmlfor='particulier'> Particulier</label>
          <Input 
            type="radio" 
            id="particulier" 
            name="role" 
            value="particulier" 
            checked 
          />

          <label htmlfor='particulier'> Brasseur </label>
          <Input 
            type="radio" 
            id="role" 
            name="role" 
            value="brasseur" 
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
      
      <Typography component='h2' sx={{ marginTop: '4rem'}}> Enregistrer une brasserie </Typography>


      <Input 
        id="standard-basic"
        variant="standard"
        name='title'
        type='text'
        label="Nom de la brasserie :"
    
      />
      <Input 
        id="standard-basic"
        variant="standard"
        name='image'
        type='file'
        accept="image/png, image/jpeg"
        
    
      />
      <Input 
        id="standard-basic"
        variant="standard"
        name='phone'
        type='tel'
        label="Numéro de téléphone :"
      />
        <Input 
        id="standard-basic"
        variant="standard"
        name='adress'
        type='text'
        label="Adresse :"
      />
        <Input
        id="standard-basic"
        variant="standard"
        name='adress'
        type='text'
        label="Description :"
      />

      </Box>

      <Button sx={{width: '100%', marginTop: '2rem'}} variant="contained" type='submit'>S'inscrire</Button>
    </>
  
  );
}

// == Export
export default Register;
