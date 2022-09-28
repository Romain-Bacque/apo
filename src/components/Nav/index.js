// == Import
import { NavLink, Link } from 'react-router-dom';
import './style.scss';
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
// == Composant
function Nav() {
  const checkIsActive = ({isActive}) => isActive ? 'nav-link active' : 'nav-link';
  return (
    <nav className='nav'>
      <button className='nav-geoloc'> Le brasseries autour de chez moi </button>
      <NavLink className={checkIsActive}  to='/'> Accueil </NavLink>
      <NavLink className={checkIsActive}  to='/login'>Connexion</NavLink>
      <NavLink className={checkIsActive}  to='/signup'>Inscription</NavLink>
      <NavLink className={checkIsActive}  to='/events'> Evenements</NavLink>
      <NavLink className={checkIsActive}  to='/breweries'> Mes brasseries</NavLink>
      <NavLink className={checkIsActive}  to='/profil'> Profil </NavLink>
      <Link className='nav-link' to='/signout'> Se déconnecter </Link>
    </nav>
  );
}
// == Export
export default Nav;
