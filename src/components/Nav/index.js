// == Import
import { NavLink} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';
// == Composant
function Nav() {
  const checkIsActive = ({isActive}) => isActive ? 'nav-link active' : 'nav-link';

  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.logged);
  const pseudo = useSelector((state) => state.user.pseudo);
  
  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };


  return (
    <nav className='nav'>
      <button className='nav-geoloc'> Le brasseries autour de chez moi </button>

      <NavLink end className={checkIsActive} to='/'> Accueil </NavLink>
      <NavLink className={checkIsActive} to='/login'>Connexion</NavLink>
      <NavLink className={checkIsActive} to='/signup'>Inscription</NavLink>
      <NavLink className={checkIsActive} to='/events'> Evenements</NavLink>
      <NavLink className={checkIsActive} to='/breweries'> Mes brasseries</NavLink>
      <NavLink className={checkIsActive} to='/profil'> Profil </NavLink>
      {isLogged && (
            <div className="login-form-logged">
              <p className="login-form-message">
                Bienvenue {pseudo}
              </p>
              <button
                type="button"
                className="login-form-button"
                onClick={handleLogout}
              >
                Déconnexion
              </button>
            </div>
          )}

    </nav>
  );
}
// == Export
export default Nav;

