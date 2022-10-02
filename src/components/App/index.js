// == Import
import './style.scss';
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
// == Composant
import Header from '../Header';
import Footer from '../Footer';
import Map from '../Map';
import Login from '../Login';
import Register from '../Register';
import Account from '../Account';
import Nav from '../Nav';
import FormBrewerie from '../Form_brewerie';
import UpdateBrewery from '../Breweries/UpdateBrewery';
import OneBrewerie from '../One_brewerie';
import BreweriesList from '../BreweriesList';
import FormEvent from '../Events/FormEvent';
import Breweries from '../Breweries';
import Events from '../Events';

function App() {
  const open = useSelector((state) => state.openmenu.open);
  return (
    <div className="app">
      <Header />
      {open && <Nav />}
        <main className='main'>
          <Routes>
            <Route path='/map' element={<Map />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            <Route path='/breweries/:name' element={<OneBrewerie />} />
            <Route path='/breweriesList' element={<BreweriesList />} />
            <Route path='/breweries' element={<Breweries />} />
            <Route path='/profil' element={<Account />} />
            <Route path='/brewery/form_brewery' element={<FormBrewerie />} />
            <Route path='/brewery/update' element={<UpdateBrewery />} />
            <Route path='/create-event' element={<FormEvent />} />
            <Route path='/events' element={<Events />} />
          </Routes>
        </main>
      <Footer />
    </div>
  );
}

// == Export
export default App;
