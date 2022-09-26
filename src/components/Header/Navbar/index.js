// == Import
import './style.scss';
// == Composant
import { Menu } from 'react-feather';
import { useDispatch } from 'react-redux';

function Navbar() {
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch({
      type: 'OPEN_MENU',
    })
  }
  return (
    <div className="Navbar">
      <Menu onClick={handleOpen}/>
    </div>
  );
}

// == Export
export default Navbar;
