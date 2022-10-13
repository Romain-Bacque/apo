// == Import
import './style.scss';
import { Routes, Route } from 'react-router-dom'
import {Box, Container} from '@mui/material';

// == Composant
import Header from '../Header';
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
import CustomSnackbars from '../UI/CustomSnackbars';
import Loading from '../App/Loading';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../selector/theme';


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const snackbarContent = useSelector((state) => state.snackbar);
  const loading = useSelector((state) => state.data.loading)

  useEffect(() => {
    dispatch({
      type: 'USER_VERIFICATION',
    })
  }, [dispatch]);

  useEffect(() => {
    console.log('fetch data')
    dispatch({
      type: 'FETCH_DATA',
    })
  }, [dispatch]);

  useEffect(() => {
    if(snackbarContent.statut) {
      setIsOpen(true);
    }

    const timer = setTimeout(() => {
      dispatch({
        type: 'RESET_SNACKBAR',
      })
    }, 5000);

    return () => {
      clearTimeout(timer);
    }
  }, [
    snackbarContent.message,
    snackbarContent.statut,
    dispatch
  ]);  


  return (   
    <>
    {snackbarContent.statut && <CustomSnackbars
      message={snackbarContent.message}
      statut={snackbarContent.statut}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      />}
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}> 

    <ThemeProvider theme={theme}> 

      <Header />
            <Container conponent='main'>
              <Routes>

                {loading && <Route path='/search/:value' element={<Loading/>} />}
                {loading === false && <Route path='/search/:value' element={<BreweriesList />} />}
                {loading && <Route path='/' element={<Loading />} />}
                {loading === false && <Route path='/' element={<Map />} />}
                <Route path='/signup' element={<Register />} />
                {loading && <Route path='/breweries/:id' element={<Loading />} />}
                {loading === false && <Route path='/breweries/:id' element={<OneBrewerie />} />}
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
            </Container>
            {/* <Footer /> */}
    </ThemeProvider>
    </Box>
    </>
  );
}

// == Export
export default App;