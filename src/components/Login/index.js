// == Import
import { Box, Button } from '@mui/material';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


// == Composant
import Input from '../Input'

function Login() {


  const dispatch = useDispatch();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('je passe par handleSubmit');
    dispatch({
      type: 'LOGIN',
    });
    console.log('je sort de handleSubmit');
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '90%', padding: '2rem', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'space-between', gap: '2rem'}}>
        <Input 
          id="filled-basic"
          variant="filled"
          label="Email"
          name='email'
          type='email'
        />
        <Input 
          id="filled-basic"
          variant="filled"
          label="Mot de passe"
          name='password'
          type='password'
        />
      
        <Button variant="contained" type='submit'>Se connecter</Button>
        <Link to='/signup'>Vous n'êtes pas enregistré ?</Link>
      </Box>

    </>
  );
}

// == Export
export default Login;