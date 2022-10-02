// == Import
import { Container, Typography, IconButton } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SportsBarOutlinedIcon from '@mui/icons-material/SportsBarOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import './style.scss';
// == Composant
import { NavLink } from 'react-router-dom';

function AccountMenu() {
  return (

      <Container sx={{ position: 'fixed', top: '60px', display: 'flex', alignItems: 'center', textAlign: 'center', backgroundColor: 'white', width: '100%', justifyContent: 'space-between', p: 2}}>

        <IconButton>
        <NavLink to='/profil'>
          <AssignmentIndIcon />
          <Typography sx={{ minWidth: 100 }}>Profil</Typography>
        </NavLink>
        </IconButton>

        <IconButton>
        <NavLink to='/breweries'>
          <SportsBarOutlinedIcon />
          <Typography sx={{ minWidth: 100 }}>Brasseries</Typography>
        </NavLink>
        </IconButton>
        
        <IconButton>
        <NavLink to='/events'>
          <CalendarMonthOutlinedIcon />
          <Typography sx={{ minWidth: 100 }}>Evenements</Typography>
        </NavLink>
        </IconButton>

      </Container>
   
   

  );
}

// == Export
export default AccountMenu;
