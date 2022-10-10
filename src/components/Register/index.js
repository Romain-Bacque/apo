// == Import
import { Box, Typography, Button, Snackbar, Alert, Container} from '@mui/material';

import './style.scss';

import Input from '../Input'
import { useDispatch, useSelector} from 'react-redux';

// == Composant


function Register() {


  const dispatch = useDispatch();
  const  getRole = useSelector(state => state.user.role);
  const  registered = useSelector(state => state.user.isRegistered);
  console.log(registered);
  const handleRegister = (evt) => {
    evt.preventDefault();
    dispatch({
      type: 'REGISTER',
    },);
  };

  const handleRole =(e) =>{
    console.log(e.target.value);
    dispatch({
      type: 'ROLE',
  },);
};
      
  return (

    <>
      <Container component="form" onSubmit={handleRegister} sx={{marginTop: '0px'}}>

        <Typography omponent='h2'> Créer un compte </Typography>

        <Box>

          <label htmlfor='particulier'> Particulier</label>

          <input 
            type="radio" 
            id="particulier" 
            name="role" 
            value="user" 
            checked
            onCheck={handleRole}
          />


          <label htmlfor='particulier'> Brasseur </label>

          <input 
            type="radio" 
            id="role" 
            name="role" 
            value="brewer" 
            onCheck={handleRole}
            />

        </Box>

        <Input
          name='name'
          type='text'
          label="Nom ou Pseudo :"
          
        />
        <Input
          name='email'
          type='email'
          label="adresse email :"
      
        />
        <Input 
          name='password'
          type='password'
          label="Entrer un mot de passe :"
        />
          <Input
          name='confirm-pass'
          type='password'
          label="comfirmer le mot de passe :"
        />

      </Container>
      <Container component='form' sx={{marginTop: '0px'}}>
  
     { getRole  &&( <>
          <Typography component='h2'> Enregistrer une brasserie </Typography>

          <Input
          name='title'
          type='text'
          label="Nom de la brasserie :" 
          />

          <Input
           name='image'
           type='file'
           accept="image/png, image/jpeg"
           variant='standard'
           />
           
           <Input
           name='phone'
           type='tel'
           label="Numéro de téléphone :" 
           />
           
           <Input
           name='adress'
           type='text'
           label="Adresse :" 
           />

           <Input
           name='adress'
           type='text'
           label="Description :"
            />
      </>
            )} 
        {registered && (
          <>
            <Snackbar  autoHideDuration={1000} >
            <Alert  severity="success">
              This is a success message!
            </Alert>
            </Snackbar>
          </>
        )} 
        <Button variant="contained" type='submit'>S'inscrire</Button>    
      </Container>
    </>
  );
}

// == Export
export default Register;