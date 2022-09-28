// == Import
import './style.scss';
import { Link } from 'react-router-dom'
// == Composant
import EventBrewery from './EventBrewery';

function EventsBrewery() {
  return (
    <div className="EventsBrewery">
      <h2 className='title-event-brewery'> Mes évènements </h2>
      <EventBrewery />
      <Link to='/create-event' className='add-event' type='submit'> Ajouter un évènement </Link>
    </div>
  );
}

// == Export
export default EventsBrewery;
