// == Import
import { Container, Box, IconButton, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import './style.scss';

// == Composant
function Footer() {
  return (
    <Container sx={{position: 'fixed', bottom: '40px', zIndex: 1000}}>
        <Box sx={{ bgcolor: '#cfe8fc', height: '50px',  display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center', borderRadius: '5px' }} >

        <IconButton sx={{p: 1, flexDirection: 'column', borderRadius: '0px'}}>
          <HomeIcon color="primary"/>
          <Typography sx={{ fontSize: '10px', textAlign: 'center' }}>Board</Typography>
        </IconButton>

        <IconButton sx={{p: 1, flexDirection: 'column', borderRadius: '0px'}}>
          <MapIcon color="primary" />
          <Typography sx={{ fontSize: '10px', textAlign: 'center' }}>Carte</Typography>
        </IconButton>

        </Box>
    </Container>
  );
}

// == Export
export default Footer;
