// == Import
import { useSelector } from 'react-redux';
import './style.scss';
// == Composant
import Category from './Category'

function Categories({ tags }) {

  return (
   
    <form className="categories">
      {tags.map((categorie) => (
              <Category 
                key={categorie.id}
                tag={categorie.tag}
              />
              ))}


    </form>
  );
}

// == Export
export default Categories;
