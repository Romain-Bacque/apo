// == Import
import './style.scss';
import { Routes, Route, Navigate } from 'react-router-dom'
import {Box, Container, CssBaseline} from '@mui/material';

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
import Test from '../Test';
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

  const logged = useSelector((state) => state.user.logged)
    
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
    <Box>
    <ThemeProvider theme={theme}> 
    <CssBaseline />
      <Header />
            <Container conponent='main'  sx={{fontFamily: 'Silkscreen'}} >
              <Routes>
                {loading && <Route path='/' element={<Loading />} />}
                {loading === false && <Route path='/' element={<Map />} />}
                {loading === false && <Route path='/breweries/:id' element={<OneBrewerie />} />}
                {loading && <Route path='/breweries/:id' element={<Loading />} />}
                {loading && <Route path='/search/:value' element={<Loading/>} />}
                {loading === false && <Route path='/search/:value' element={<BreweriesList />} />}
                <Route path='/signup' element={<Register />} />
                <Route path='/login' element={<Login />} />

              {logged ? (
                <>
                <Route path='/breweries' element={<Breweries />} />
                <Route path='/brewery/form_brewery' element={<FormBrewerie />} />
                <Route path='/brewery/update/:id' element={<UpdateBrewery />} />
                <Route path='/create-event' element={<FormEvent />} />
                <Route path='/events' element={<Events />} />
                <Route path='/events/:id' element={<OneEvent />} />
                <Route path='/profil' element={<Profil />} />
                <Route path='/Brewery/event' element={<UpdateEventBrewery />} />
                </>
              ) : <Route path='*' element={<Login />} />}

              <Route path='/test' element={<Test />} />
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