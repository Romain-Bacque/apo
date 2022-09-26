// == Import
import './style.scss';
import { Link } from 'react-router-dom'
// == Composant
import Input from '../Input'
function Login() {
  return (
    <form className="login">
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
