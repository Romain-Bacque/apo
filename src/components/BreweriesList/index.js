import React from 'react'
import OneBrewerie from './OneBrewerie';
import { Box } from '@mui/material';

import { useSelector } from 'react-redux';





function BreweriesList() {

  
  const brewery = useSelector((state) => state.data.breweries);

  
    return (
      // <Box sx={{height: '50rem', overflow: 'auto', width: '90%'}}>
      <>
        <Box sx={{ width: '100%', padding: '1rem' }} > 

          {/* {breweries.map((brewery) => ( */}
            <OneBrewerie 

            />
          {/* ))} */}
        
        </Box>

      </>
      // </Box>
    );
}

export default BreweriesList;