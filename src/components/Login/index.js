// == Import
import './style.scss';

import { useDispatch } from 'react-redux';


// == Composant
import Input from '../Input'

function Login() {

  const dispatch = useDispatch();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch({
      type: 'LOGIN',
    });
  };


  
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2 className='login-title'> Se connecter</h2>
      <label for='mail'> Email : </label>
      <Input 
        name='email'
        type='email'
        className='login-email'
        id='mail'
      />
      <label for='pass'> Mot de passe :  </label>
      <Input 
        name='password'
        type='password'
        className='login-password'
        id='pass'
      />
      <a className='login-reset'> Oublié ?</a>
     
      <button type='submit' className='login-submit'>Valider</button>
      <a className='login-iscription'>Vous n'êtes pas enregistré?</a>
    </form>
  );
}

// == Export
export default Login;