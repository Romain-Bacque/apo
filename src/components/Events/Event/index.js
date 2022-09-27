// == Import
import './style.scss';
import { ChevronDown } from 'react-feather'
// == Composant
import logo from '../../Header/logo.svg';

function Event() {
  return (
    <div className="event">
      
      <section className='event-section'>
        <article className='event-brewer'>
          <img className='event-img' src={logo} alt=''/>

          <article className='event-brewery-info'>
            <h3 className='event-brewery'> Titre de la brasserie </h3>
            <p className='event-address'>Adresse</p>
          </article>
        </article>

          <article className='event-article'>

            <article className='event-info'>
              <article className='event-subinfo'>
                <h3 className='event-name'>Evenement</h3>
                <p className='event-description'>Description<span><ChevronDown /></span></p>
              </article>

              <article className='event-btn'>
                <button className='event-btn'>Annuler</button>
              </article>
            </article>
            

            <article className='event-more'>
              <span className='event-date'>Date</span>
              <span className='event-participate'>Participants(0)</span>
            </article>

          </article>

      </section>

    </div>
  );
}

// == Export
export default Event;
