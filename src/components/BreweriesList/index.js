import React from 'react'
import OneBrewerie from './OneBrewerie';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';






function BreweriesList() {

  const params = useParams();
  const data = useSelector((state) => state.data.breweries)
  // console.log(data)
  console.log(params)
  const search = data.filter(brewery => brewery.address.includes('Paris')).map(filteredData => console.log(filteredData))
  console.log(search)
  
  
  
  
  
  return (
    
    <Box sx={{height: '50rem', overflow: 'auto', width: '90%'}}>
      <>
        <Box sx={{ width: '100%', padding: '2rem', marginTop: '5rem' }} > 

        {data.filter(brewery => brewery.address.includes(params)).map(filteredData => (
         
                <OneBrewerie 
                  key={filteredData.id}
                  title={filteredData.title}
                  phone={filteredData.phone}
                  address={filteredData.address}
                  tags={filteredData.categories}
                />
        ))}
        
          
            
        
        </Box>

      </>
      </Box>
    );
}

export default BreweriesList;