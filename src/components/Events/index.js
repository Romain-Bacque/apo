// == Import
import { Button, Grid, Typography } from '@mui/material';

import './style.scss';
import Event from '../Events/Event'
// == Composant
import MyEvent from './MyEvent'

function Events() {
  return (
    <>
        <Typography variant="h2">
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
