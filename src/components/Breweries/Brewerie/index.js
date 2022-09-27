// == Import
import './style.scss';
// == Composant
function Brewerie() {
  return (
    <section className="brewerie">
      <article className='brewerie-list'>
        <h2 className='title'> Titre de la brasserie </h2>
        <button type='submit' className='btn'> Gérer </button>
      </article>
    </section>
  );
}

// == Export
export default Brewerie;
