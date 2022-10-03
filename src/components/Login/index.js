// == Import
import { Box, Button } from '@mui/material';
import './style.scss';

import { useDispatch } from 'react-redux';


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
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '90%', padding: '2rem', backgroundColor: 'white', display: 'flex', flexDirection: 'column', gap: '2rem'}}>
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
    </Box>
  
    // <form className="login" onSubmit={handleSubmit}>

    //   <h2 className='login-title'> Se connecter</h2>
    //   <label for='mail'> Email : </label>
    //   <Input 
    //     name='email'
    //     type='email'
    //     className='login-email'
    //     id='mail'
    //   />
    //   <label for='pass'> Mot de passe :  </label>
    //   <Input 
    //     name='password'
    //     type='password'
    //     className='login-password'
    //     id='pass'
      
    //   />
    //   <a className='login-reset'> Oublié ?</a>
     
    //   <button type='submit' className='login-submit'>Valider</button>
    //   <a className='login-iscription'>Vous n'êtes pas enregistré?</a>

    // </form>
  );
}

// == Export
export default Login;