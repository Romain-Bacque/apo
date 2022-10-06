// == Import
import './style.scss';

import { Routes, Route } from 'react-router-dom'
import {Box} from '@mui/material';
// == Composant
import Header from '../Header';
import Footer from '../Footer';
import Map from '../Map';
import Login from '../Login';
import Register from '../Register';
import FormBrewerie from '../Form_brewerie';
import UpdateBrewery from '../Breweries/UpdateBrewery';
import OneBrewerie from '../One_brewerie';
import BreweriesList from '../BreweriesList';
import FormEvent from '../Events/FormEvent';
import Breweries from '../Breweries';
import Events from '../Events';
import OneEvent from '../Events/OneEvent';
import Profil from '../Profil';
import UpdateEventBrewery from '../Breweries/UpdateEventBrewery';

import Loading from '../App/Loading';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';



function App() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.data.loading)
    
  useEffect(() => {
    console.log('fetch data')
    dispatch({
      type: 'FETCH_DATA',
    })
  }, []);



  return (


      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}> 
      <Header />
            <Box conponent='main' sx={{margin: 'auto', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Routes>
                {loading && <Route path='/search' element={<Loading/>} />}
                {loading === false && <Route path='/search' element={<BreweriesList/>} />}
                {loading && <Route path='/' element={<Loading />} />}
                {loading === false && <Route path='/' element={<Map />} />}
                <Route path='/signup' element={<Register />} />
                <Route path='/breweries/:id' element={<OneBrewerie />} />
                <Route path='/breweriesList' element={<BreweriesList />} />
                <Route path='/breweries' element={<Breweries />} />
                <Route path='/brewery/form_brewery' element={<FormBrewerie />} />
                <Route path='/brewery/update' element={<UpdateBrewery />} />
                <Route path='/create-event' element={<FormEvent />} />
                <Route path='/events' element={<Events />} />
                <Route path='/events/:id' element={<OneEvent />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profil' element={<Profil />} />
                <Route path='/Brewery/event' element={<UpdateEventBrewery />} />
              </Routes>
            </Box>

            <Footer />
      </Box>
  );
}

// == Export
export default App;
