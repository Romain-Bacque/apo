// == Import
import Typography from '@mui/material/Typography';
import { Button} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom'

// == Composant

function Event() {
  return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> Mer 05 oct . 9:00 </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography> Les alcolo du dimanche </Typography>
        <Typography > <Link to='/events/:id'>  Détail </Link></Typography>
          <form>
            <Button variant="contained" type='submit'>Annuler</Button>
          </form>
        </AccordionDetails>
      </Accordion>  
  );
}
// == Export
export default Event;
