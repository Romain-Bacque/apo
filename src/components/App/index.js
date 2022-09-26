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
            <Route path='/profil' element={<Profil />} />
            <Route path='/signout' element={<Home />} />
          </ Routes>
        </main>
      <Footer />
    </div>
  );
}

// == Export
export default App;
