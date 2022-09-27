// == Import
import './style.scss';
import Event from '../Events/Event'
// == Composant
function Events() {
  return (
    <div className="Events">
      <h2 className='Events-title'>Mes évènements(1)</h2>
      <Event />
    </div>
  );
}

// == Export
export default Events;
