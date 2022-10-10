// == Import
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { StyledButton } from '../../../selector/styles'
// == Composant
import { Link } from 'react-router-dom'
function Brewerie() {
  return (
    <Card sx={{ width: '95%' }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          La brasserie de lulu
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions sx={{ justifyContent: 'center' }}>

      <Link to='/brewery/update'>
        <StyledButton size="small" variant="contained" sx={{ display : 'flex', justifyContent: 'flex-end', with: '100%'}}>
          Gérer
        </StyledButton>
      </Link>

    </CardActions>
  </Card>
);
}


// == Export
export default Brewerie;
