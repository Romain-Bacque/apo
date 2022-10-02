// == Import

import './style.scss';
// == Composant
import Input from '../Input'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box} from '@mui/material';


function Profil() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> vilanelle </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <form>
          <Box sx={{display: 'flex',   justifyContent: 'center', alignItems: 'center', gap: '2rem'}}>
            <TextField id="standard-basic" label="Changer de pseudo :" variant="standard" />
            <Button variant="contained" type='submit'>Modifier</Button>
          </Box>
          </form>

          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>nom.prenom@gmail.com</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <form>
          <Box sx={{display: 'flex',   justifyContent: 'center', alignItems: 'center', gap: '2rem'}}>
            <TextField id="standard-basic" label="Changer l'adresse email :" variant="standard" />
            <Button variant="contained" type='submit'>Modifier</Button>
          </Box>
          </form>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography> Mot de passe </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <form>
          <Box sx={{display: 'flex',   justifyContent: 'center', alignItems: 'center', gap: '2rem'}}>
            <TextField id="standard-basic" label="Changer de mot de passe :" variant="standard" />
            <Button variant="contained" type='submit'>Modifier</Button>
          </Box>
          </form>

          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
export default Profil;
