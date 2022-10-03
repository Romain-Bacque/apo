// == Import
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import './style.scss';
import Event from '../Events/Event'
// == Composant
import AccountMenu from '../Account/AccountMenu';
import MyEvent from './MyEvent'

function Events() {
  return (
    <>
    <AccountMenu />
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem'}}>

      <Accordion sx={{ width: '90%'}}>
      
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> Mes évènements (1) </Typography>
        </AccordionSummary>


        <AccordionDetails >
        <MyEvent />
          
        </AccordionDetails>

      </Accordion>

        <Event />
    </Box>
    </>
  );
}

// == Export
export default Events;
