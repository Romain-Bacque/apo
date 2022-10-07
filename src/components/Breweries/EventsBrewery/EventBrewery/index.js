// == Import
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { StyledButton } from '../../../../selector/styles'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>

    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>

      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Evenement
      </Typography>

      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <StyledButton> Participer </StyledButton>
      </Typography>

    </Box>

      <Typography variant="h5" component="div">
        Les alcolos du dimanche
      </Typography>

      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Description
      </Typography>

      <Typography variant="body2">
        Comme tous les dimanche, venons nous souler tous enssemble
      </Typography>

    </CardContent>

    <CardActions sx={{justifyContent: 'space-between'}}>
      <Typography size="small">Mer 12 oct . 12:30</Typography>
      <Typography size="small">Participants (0) </Typography>
    </CardActions>

  </React.Fragment>
);
// == Composant
function EventBrewery() {
  return (

    <Box sx={{ minWidth: 275 }}>
    <Card variant="outlined">{card}</Card>
  </Box>
  );
}

// == Export
export default EventBrewery;
