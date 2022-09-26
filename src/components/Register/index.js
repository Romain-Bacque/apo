// == Import
import './style.scss';
import Input from '../Input'
// == Composant
function Register() {
  return (
    <form className="register">
    <h2 className='register-title'> S'inscrire </h2>
    <label for='lastname'> Nom : </label>
    <Input 
      name='lastname'
      type='text'
      className='register-lastname'
      id='lastname'
    />
    <label for='firstname'> Prénom </label>
    <Input 
      name='firstname'
      type='text'
      className='register-firstname'
      id='firstname'
    />
    <label for='email'> email </label>
    <Input 
      name='email'
      type='email'
      className='register-email'
      id='email'
    />
    <label for='pass'> Mot de passe :  </label>
    <Input 
      name='password'
      type='password'
      className='register-password'
      id='pass'
    />
     <label for='confirm-pass'> Confirmation du mot de passe :  </label>
    <Input 
      name='confirm-password'
      type='password'
      className='register-confirm'
      id='confirm-pass'
    />

    <button type='submit' className='login-submit'>Valider</button>
    
  </form>
  );
}

// == Export
export default Register;
