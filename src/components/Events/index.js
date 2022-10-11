// == Import
import { Button, Grid, Typography } from '@mui/material';

import './style.scss';
import Event from '../Events/Event'
// == Composant
import MyEvent from './MyEvent'

function Events() {
  return (
    <>
        <Typography gutterBottom variant="h5" component="div">
           Mes évènements (1)
        </Typography>
      <Grid container>
        <Event />
      </Grid>

    </>
  );
}

// == Export
export default Events;
