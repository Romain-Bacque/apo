// == Import
import './style.scss';
// == Composant
import Category from './Category'
function Categories() {
  return (
    <form className="categories">

      <select aria-label='Choisir un tag'>
        <option> Choisir un tag </option>
        <option> Bière blond </option>
        <option> Bière brune </option>
      </select>

      <Category />

    </form>
  );
}

// == Export
export default Categories;
