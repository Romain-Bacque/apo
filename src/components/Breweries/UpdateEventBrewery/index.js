// == Import
import './style.scss';
import {Link} from 'react-router-dom'
// == Composant
import { Button, Typography } from '@mui/material';
import EventsBrewery from '../EventsBrewery'


function UpdateEventBrewery() {
  return (
    <>
    <Link to='/UpdateEventBrewery'> <Button> Ajouter un évènement </Button> </Link>
    <Typography> Evènements de la brasserie (1)</Typography>
    <EventsBrewery />
     
    </>
  );
}
// == Export
export default UpdateEventBrewery;
