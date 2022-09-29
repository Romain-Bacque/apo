// == Import
import './style.scss';
// == Composant
function EventBrewery() {
  return (
    <article className='list-event-brewery'>
      <h3 className='title'> Titre de l'évènement </h3>
      <button to='' type='submit' className='btn'> Supprimer </button>
    </article>
  );
}

// == Export
export default EventBrewery;
