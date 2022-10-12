import React from 'react'
import OneBrewerie from './OneBrewerie';
import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';






function BreweriesList() {

  const zipCode = new RegExp('[0-9]{5}');

  const params = useParams();
  const data = useSelector((state) => state.data.breweries)
  // const test = data.map(brewery => console.log(brewery.address.match(zipCode).toString()))


  // .map(filteredData => console.log(filteredData))
  
  return (
    
      <>
        <Grid container spacing={2}> 

        {data.filter(brewery => brewery.address.includes(params.value)).map(filteredData => (
         
                <OneBrewerie 
                  key={filteredData.id}
                  id={filteredData.id}
                  title={filteredData.title}
                  phone={filteredData.phone}
                  address={filteredData.address}
                  tags={filteredData.categories}
                  image={filteredData.image}
                />
        ))}
        
          
            
        
        </Grid>

      </>

    );
}

export default BreweriesList;