// == Import
import Typography from '@mui/material/Typography';
import { Button} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom'
import './style.scss';
// == Composant

function Event() {
  return (
      <Accordion sx={{ width: '100%'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> Mer 05 oct . 9:00 </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography sx={{fontWeight: 'bold'}}> Les alcolo du dimanche </Typography>
        <Typography > <Link to='/events/:id'>  Détail </Link></Typography>
          <form>
            <Button variant="contained" type='submit' sx={{marginTop: '1rem', width: '100%', bgcolor: 'red'}}>Annuler</Button>
          </form>
        </AccordionDetails>
      </Accordion>  
  );
}
// == Export
export default Event;
