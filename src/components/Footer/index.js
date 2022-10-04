// == Import
import * as React from 'react';
import { Box } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import MapIcon from '@mui/icons-material/Map';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import GradeIcon from '@mui/icons-material/Grade';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link } from 'react-router-dom';


// == Composant
function Footer() {
  const [value, setValue] = React.useState(0);

  return (
    
    <>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
    
      <BottomNavigationAction component={Link} end to='/' label="Carte" icon={<MapIcon />} />
      <BottomNavigationAction label="GPS" icon={<ShareLocationIcon />} />
      <BottomNavigationAction label="Favories" icon={<GradeIcon />} />
      <BottomNavigationAction component={Link} to='/signup' label="S'inscrire" icon={<AppRegistrationIcon />} />
      

      </BottomNavigation>
  </>
    
  );
}

// == Export
export default Footer;
