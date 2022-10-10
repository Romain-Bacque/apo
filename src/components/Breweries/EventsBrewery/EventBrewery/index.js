// == Import
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';


const card = (
  <React.Fragment>
    <CardContent>

    <Box>

      <Typography >
        Evenement
      </Typography>

      <Typography>
        <Button> Participer </Button>
      </Typography>

    </Box>

      <Typography variant="h5" component="div">
        Les alcolos du dimanche
      </Typography>

      <Typography>
        Description
      </Typography>

      <Typography variant="body2">
        Comme tous les dimanche, venons nous souler tous enssemble
      </Typography>

    </CardContent>

    <CardActions>
      <Typography size="small">Mer 12 oct . 12:30</Typography>
      <Typography size="small">Participants (0) </Typography>
    </CardActions>

  </React.Fragment>
);
// == Composant
function EventBrewery() {
  return (

    <Box>
    <Card variant="outlined">{card}</Card>
  </Box>
  );
}

// == Export
export default EventBrewery;
