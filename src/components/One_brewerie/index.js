import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './style.scss';
import Categories from '../Categories';

function One_brewerie () {
    return(
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
            La brasserie du zythophile
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{alignItems: 'center', marginTop: '2rem'}}>
           <LocationOnIcon /> 131 rue carno 92450 ville
          </Typography>

          <Typography variant="body2" color="text.secondary">
           <PhoneIcon /> 01.30.55.38.20
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{marginTop: '2rem'}}>
           <Categories />
          </Typography>

          <Typography variant="body2" color="text.secondary">
        
          </Typography>

          <Typography sx={{marginTop: '2rem', marginBottom: '2rem'}}> Déscription </Typography>

          <Typography>
          Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
          </Typography>

        </CardContent>

      </CardActionArea>

      <CardActions sx={{ justifyContent: 'center'}}>
      
      </CardActions>

    </Card>



        // <div className='brewery'>
        //     <div className='brewery-header'>
        //         <section className='section-img'>
        //          <img className='brewery-img' src={logo} alt="logo"></img>
        //         </section>
        //         <section className='section-adress'>
        //             <h1 className='brewery-title'>Nom de la brasserie</h1>
        //             <span className='span-info'>adresse</span>
        //             <span className='span-info'>téléphone</span>
        //         </section>
        //     </div>

        //     <p className='brawery-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a rutrum justo, non
        //     consequat quam. </p>

        //     <div className='event-list'>
        //         <Events />
        //     </div>
        // </div>
    );
}

export default One_brewerie;