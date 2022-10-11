// == Import
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
// == Composant
import { Link } from 'react-router-dom'
function Brewerie() {
  return (
    <Card >
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
    <CardActions>

      <Link to='/brewery/update'>
        <Button size="small" variant="contained">
          Gérer
        </Button>
      </Link>

    </CardActions>
  </Card>
);
}


// == Export
export default Brewerie;
