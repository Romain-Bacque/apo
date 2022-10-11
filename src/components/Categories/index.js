// == Import
import { useSelector } from 'react-redux';
import './style.scss';
// == Composant
import Category from './Category'

function Categories({ tags }) {

  const categories = useSelector ((state) => state.data.breweries)
  console.log(tags)
  return (
   
    <form className="categories">
      {categories.map((categorie) => (
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
