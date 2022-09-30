// == Import
import './style.scss';
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
// == Composant
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import Login from '../Login';
import Register from '../Register';
import Events from '../Events';
import Breweries from '../Breweries';
import Profil from '../Profil';
import Nav from '../Nav';
import FormBrewerie from '../Form_brewerie';
import UpdateBrewery from '../Breweries/UpdateBrewery';
import OneBrewerie from '../One_brewerie';
import FormEvent from '../Events/FormEvent';

function App() {
  const open = useSelector((state) => state.open);
  return (
    <div className="app">
      <Header />
      {open && <Nav />}
        <main className='main'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            <Route path='/events' element={<Events />} />
            <Route path='/breweries' element={<Breweries />} />
            <Route path='/breweries/:name' element={<OneBrewerie />} />
            <Route path='/profil' element={<Profil />} />
            <Route path='/signout' element={<Home />} />
            <Route path='/brewery/form_brewery' element={<FormBrewerie />} />
            <Route path='/brewery/update' element={<UpdateBrewery />} />
            <Route path='/create-event' element={<FormEvent />} />
          </Routes>
        </main>
      <Footer />
    </div>
  );
}

// == Export
export default App;
