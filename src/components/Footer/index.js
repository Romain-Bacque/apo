// == Import
import { Box, IconButton, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import { NavLink } from 'react-router-dom';


// == Composant
function Footer() {
  return (
    
        <Box sx={{ width: '100%', bgcolor: '#cfe8fc', height: '50px',  display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center', position: 'absolute', bottom: '0rem'}}>

        <IconButton sx={{flexDirection: 'column', borderRadius: '0px'}}>
        <NavLink  end to='/'>
          <HomeIcon color="primary"/>
          <Typography sx={{ fontSize: '10px', textAlign: 'center' }}>Board</Typography>
        </NavLink>
        </IconButton>

        <IconButton sx={{ flexDirection: 'column', borderRadius: '0px'}}>
        <NavLink to='/map'>
          <MapIcon color="primary" />
          <Typography sx={{ fontSize: '10px', textAlign: 'center' }}>Carte</Typography>
        </NavLink>
        </IconButton>

        </Box>
    
  );
}

// == Export
export default Footer;
