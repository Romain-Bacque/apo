// == Import

import './style.scss';
// == Composant
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Container } from '@mui/material';
import Input from '../Input';
import { useSelector } from 'react-redux';


function Profil() {
  const {name, email} = useSelector(state => state.user)
  return (
    <Container component='form'>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> {name} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Input
              name='name' 
              label="Changer de pseudo :"
            />
            <Button type='submit'>Modifier</Button>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>{email}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Input 
              name='email'
              label="Changer l'adresse email :"
            />
            <Button variant="contained" type='submit'>Modifier</Button>
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
            <Button type='submit'>Réinitialiser le mot de passe</Button>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
export default Profil;
