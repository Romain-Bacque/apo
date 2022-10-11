// == Import
import './style.scss';
// == Composant
import Category from './Category'

function Categories({ tags }) {

  const categories = useSelector ((state) => state.data.breweries)
  console.log(tags)
  return (
   
    <form className="categories">
<<<<<<< HEAD
      {tags.map((tag) => (
        <Category 
        key={tag.id}
        tag={tag.tag}
        />
        ))}
=======
      {categories.map((categorie) => (
              <Category 
                key={categorie.id}
                tag={categorie.tag}
              />
              ))}


>>>>>>> 4f28158240022a3009f2516801e2d02d9f27bd4a
    </form>
  );
}

// == Export
export default Categories;
