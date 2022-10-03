// == Import
import { Container, Box, IconButton, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import { NavLink } from 'react-router-dom';
import './style.scss';

// == Composant
function Footer() {
  return (
    // <Container sx={{width: '100%'}}>
        <Box sx={{ width: '100%', bgcolor: '#cfe8fc', height: '50px',  display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center'}}>

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
    // </Container>
  );
}

// == Export
export default Footer;
