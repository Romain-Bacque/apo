// == Import
import './style.scss';
import Input from '../Input'
// == Composant
function Register() {
  return (
    <form className="register">
    <h2 className="register-title"> S'inscrire </h2>
    <div className="register-radio">
    <label for="role">Particulier</label>
    <Input type="radio" id="role" name="role" value="particulier" checked></Input>
    <label for="role">Brasseur</label>
    <Input type="radio" id="role" name="role" value="brasseur"></Input>
    </div>
    <label for='name'> Nom et prénom : </label>
    <Input 
      name='name'
      type='text'
      className='register-name'
      id='name'
    />
    <label for='email'> email : </label>
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
    
    <div className='register-brewery'>
      <h2 className='register-title'> Création de la brasserie </h2>

      <label for='title'>Nom:</label>
      <Input 
        name='titre'
        type='text'
        id='title'
      />
      <label for='image'>Choisir un logo:</label>
      <Input 
        name='image'
        type='file'
        id='image'
        accept="image/png, image/jpeg"
      />
      <label for='phoneNumber'>Téléphone:</label>
      <Input 
        name='phone'
        type='number'
        id='phoneNumber'
      />
      <label for='phoneNumber'>Adresse</label>
      <Input 
        name='phone'
        type='number'
        id='phoneNumber'
      />
      <label for='description'>Description</label>
      <textarea
        name='description'
        rows="5"
        cols="33"
        id='description'
      />
    </div>
    <button type='submit' className='register-submit'>Valider</button>
    
  </form>
  );
}

// == Export
export default Register;
