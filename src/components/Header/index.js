// == Import
import './style.scss';
// == Composant
import Input from '../Input'
import Navbar from '../Header/Navbar'
import logo from './logo.svg'

function Header() {
  // const handleToggleButton = (event) => {
  //   event.stopPropagation();

  // };

  return (
    <header className="header">

       <img src={logo} alt='' className='header-logo'/> 
       {/* <div
          onClick={handleToggleButton}
          className={`"menu-button" ${isOpen && "active-menu"}`}
        >
          <div className="menu-button__line"></div>
          <div className="menu-button__line"></div>
          <div className="menu-button__line"></div>
        </div> */}
       <Input name='search' className='header-searchbar' placeholder=" Rechercher.."/>
       <Navbar className='header-navbar'/>
    </header>
  );
}
  
// == Export
export default Header;
