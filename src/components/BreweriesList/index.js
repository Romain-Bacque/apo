import OneBrewerie from './OneBrewerie';
import { Box } from '@mui/material';

function BreweriesList() {
    return (
      // <Box sx={{height: '50rem', overflow: 'auto', width: '90%'}}>
      <>
        <Box sx={{ width: '100%', padding: '1rem' }} > 
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
        
        </Box>

      

      </>
      // </Box>
    );
}

export default BreweriesList;