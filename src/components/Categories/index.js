// == Import
import './style.scss';
// == Composant
import Category from './Category'

function Categories({ tags }) {


  return (
    <form className="categories">
      {tags.map((tag) => (
        <Category 
        key={tag.id}
        tag={tag.tag}
        />
        ))}
    </form>
  );
}

// == Export
export default Categories;
