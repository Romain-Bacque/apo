// == Import
import './style.scss';
import Event from '../Events/Event'
// == Composant
import AccountMenu from '../Account/AccountMenu';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

function Events() {
  return (
    <>
    <AccountMenu />
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem'}}>
    <Typography color={'white'}>
      <h2> Mes évènements (0)</h2>
    </Typography>
    <Typography color={'white'}>
      <h2> Evènements</h2>
    </Typography>
      <Event />
    </Box>
    </>
  );
}

// == Export
export default Events;
