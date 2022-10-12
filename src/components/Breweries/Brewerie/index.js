// == Import
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
// == Composant
import { Link } from 'react-router-dom'
function Brewerie({ image, title}) {
  return (
    <Grid item xs={12} md={4}>
      <Card >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="h5">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>

         
            <Button 
              component={Link}
              to='/brewery/update'
            > 
              Gérer
            </Button> 
         

      </CardActions>
    </Card>
    </Grid>
  );
}


// == Export
export default Brewerie;
