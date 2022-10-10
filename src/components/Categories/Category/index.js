// == Import
import './style.scss';
// == Composant
function Category({ tag }) {
  return (
      <span className='tag'> {tag} <span className='del-tag'> X </span> </span>    
  );
}

// == Export
export default Category;
