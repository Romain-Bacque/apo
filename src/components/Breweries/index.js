// == Import
import './style.scss';
import {Link} from 'react-router-dom'
// == Composant
import Brewerie from './Brewerie'
function Breweries() {
  return (
    <section className="Breweries">
      <article className='brewer'>
        <h2 className='title'>Mes brasserie(1)</h2>
        <Link to='/brewery/form_brewery' className='btn'> + brasserie</Link>
      </article>
      <Brewerie />
    </section>
  );
}
// == Export
export default Breweries;
