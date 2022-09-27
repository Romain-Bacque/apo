// == Import
import './style.scss';
// == Composant
import Brewerie from './Brewerie'
function Breweries() {
  return (
    <section className="Breweries">
      <article className='brewer'>
        <h2 className='title'>Mes brasserie(1)</h2>
        <button className='btn'> Ajouter une brasserie</button>
      </article>
      <Brewerie />
    </section>
  );
}

// == Export
export default Breweries;
