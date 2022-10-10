// == Import
import { Box, Button, Container } from '@mui/material';
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
      <Container component="form" onSubmit={handleSubmit}>
        <Input 
          label="Email"
          name='email'
          type='email'
        />
        <Input 
          label="Mot de passe"
          name='password'
          type='password'
        />
      
        <Button type='submit'>Se connecter</Button>
        <Link to='/signup'>Vous n'êtes pas enregistré ?</Link>
      </Container>

    </>
  );
}

// == Export
export default Login;