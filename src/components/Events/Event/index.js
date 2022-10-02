// == Import
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import './style.scss';
// == Composant

function Event() {
  return (
    <Card sx={{ width: '90%' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent sx={{alignItems: 'base-line'}}>
          <Typography gutterBottom variant="h5" component="div">
            Les alcolos du dimanche
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{alignItems: 'center'}}>
           <CalendarMonthIcon /> mer 05 oct, 9:00
          </Typography>
          <Typography variant="body2" color="text.secondary">
           <LocationOnIcon /> 131 rue carno 92450 ville
          </Typography>
          <Typography variant="body2" color="text.secondary">
           <PeopleAltIcon />  300 Participants
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: 'center'}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> Déscription </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
          </Typography>
          <form>
            <Button variant="contained" type='submit' sx={{marginTop: '1rem'}}>Participer</Button>
          </form>
        </AccordionDetails>
      </Accordion>
      </CardActions>
    </Card>

    
  );
}
//     <div className="event">
      
//       <section className='event-section'>
//           <article className='event-article'>

//             <article className='event-info'>
//               <article className='event-subinfo'>
//                 <h3 className='event-name'>Titre de l'évènement</h3>
//               </article>

//               <article className='event-btn'>
//                 <button className='event-btn'>Annuler</button>
//               </article>
//             </article>
            

//             <article className='event-more'>
//               <span className='event-date'>Date</span>
//               <span className='event-participate'>Participants(0)</span>
//             </article>

//           </article>

//       </section>

//     </div>
//   );
// }

// == Export
export default Event;
