// == Import
import './style.scss';
// == Composant
import Input from '../Input'
function Form_brewerie() {
  return (
    <div className='register-breweries'>
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
      <button type='submit' className='register-submit'>Valider</button>
    </div>

  );
}

// == Export
export default Form_brewerie;
