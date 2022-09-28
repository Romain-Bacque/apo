// == Import
import './style.scss';
// == Composant
import { Link } from 'react-router-dom'
function Brewerie() {
  return (
    <section className="brewerie">
      <article className='brewerie-list'>
        <h2 className='title'> Titre de la brasserie </h2>
        <Link to='/brewery/update' type='submit' className='btn'> Gérer </Link>
      </article>
    </section>
  );
}

// == Export
export default Brewerie;
