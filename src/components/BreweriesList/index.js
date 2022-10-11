import React from 'react'
import OneBrewerie from './OneBrewerie';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';






function BreweriesList() {

  const params = useParams();
  const data = useSelector((state) => state.data.breweries)
  const search = data.filter(brewery => brewery.address.includes(params.value)).map(filteredData => console.log(filteredData))
  
  
  
  return (
    
    <Box>
      <>
        <Box> 

        {data.filter(brewery => brewery.address.includes(params.value)).map(filteredData => (
      
                <OneBrewerie 
                  key={filteredData.id}
                  title={filteredData.title}
                  phone={filteredData.phone}
                  address={filteredData.address}
                  tags={filteredData.categories}
                  image={filteredData.image}
                />
        ))}
        
          
            
        
        </Box>

      </>
      </Box>
    );
}

export default BreweriesList;