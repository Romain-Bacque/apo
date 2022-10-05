import OneBrewerie from './OneBrewerie';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';



function BreweriesList() {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    console.log('fetch data')
    dispatch({
      type: 'FETCH_DATA',
    })
  }, []);
  
  const breweries = useSelector((state) => state.data.breweries);
  console.log(breweries)


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