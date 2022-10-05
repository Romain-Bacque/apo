import OneBrewerie from './OneBrewerie';
import { Container, Typography, IconButton } from '@mui/material';

function BreweriesList() {
    return (
      // <Box sx={{height: '50rem', overflow: 'auto', width: '90%'}}>
      <>
        <Typography sx={{ minWidth: 100 }}>Profil</Typography>

          <OneBrewerie />
          <OneBrewerie />
          <OneBrewerie />
          <OneBrewerie />
          <OneBrewerie />
          <OneBrewerie />
          <OneBrewerie />
          <OneBrewerie />
          <OneBrewerie />
          <OneBrewerie />
          <OneBrewerie />
          <OneBrewerie />

      </>
      // </Box>
    );
}

export default BreweriesList;