// == Import
import './style.scss';
// == Composant

function Event() {
  return (
    <div className="event">
      
      <section className='event-section'>
          <article className='event-article'>

            <article className='event-info'>
              <article className='event-subinfo'>
                <h3 className='event-name'>Titre de l'évènement</h3>
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
