// == Import
import './style.scss';
// == Composant
import Input from '../Input'
import Navbar from '../Header/Navbar'
import logo from './logo.svg'

function Header() {
  return (
    <header className="header">

       <img src={logo} alt='' className='header-logo'/> 
       <Input name='search' className='header-searchbar' placeholder=" Rechercher.."/>
       <Navbar className='header-navbar'/>
    </header>
  );
}
  
// == Export
export default Header;
