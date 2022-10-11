// == Import
import './style.scss';
// == Composant
function Category({ tags }) {
  return (
      <span className='tag'> {tags} <span className='del-tag'> X </span> </span>    
  );
}

// == Export
export default Category;
