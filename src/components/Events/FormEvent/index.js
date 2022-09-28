// == Import
import './style.scss';
// == Composant
import Input from '../../Input';

function FormEvent() {
  return (
    <form className="FormEvent">
      <div className='register-breweries'>
        <h2 className='register-title'> Ajouter un évènement </h2>

        <label for='title'>Titre :</label>
        <Input 
          name='titre'
          type='text'
          id='title'
        />
        <label for='event_start'>Date</label>
        <Input 
          name='event_start'
          type='date'
          id='event_start'
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
    </form>
  );
}

// == Export
export default FormEvent;
