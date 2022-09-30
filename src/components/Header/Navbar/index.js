// == Import
import './style.scss';
// == Composant
import { useDispatch, useSelector } from 'react-redux';
import { Turn as Hamburger } from 'hamburger-react'

function Navbar() {
  const open = useSelector((state) => state.openmenu.open);
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch({
      type: 'OPEN_MENU',
    })
  }
  return (
    <div className="Navbar">
      <Hamburger rounded toggle={handleOpen} toggled={open} />
    </div>
  );
}

// == Export
export default Navbar;
