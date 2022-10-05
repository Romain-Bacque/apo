// == Import
import { Button, Typography } from '@mui/material';

import './style.scss';
import Event from '../Events/Event'
// == Composant
import MyEvent from './MyEvent'

function Events() {
  return (
    <>
        <Typography gutterBottom variant="h5" component="div" sx={{marginBottom: '2rem'}}>
           Mes évènements (1)
        </Typography>
       
        <Event />

    </>
  );
}

// == Export
export default Events;
