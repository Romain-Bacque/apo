import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActions, Divider, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Home } from "@mui/icons-material";
import styled from "@emotion/styled";

// Style
const StyledTypography = styled(Box)({
  display: "flex",
  gap: 0.5,
  fontStyle: "italic",
  fontSize: "1.3rem",
  color: "gray",
});

function Brewerie({ image, title, address, id, setIsOpen }) {
  return (
    <Grid item xs={12} md={4}>
      <Card sx={{ width: "95%", p: 1.5 }}>
        <CardMedia
          component="img"
          height="140px"
          width="100%"
          image={image}
          alt={`image/logo brasserie '${title}'`}
        />
        <CardContent sx={{ textAlign: "start" }}>
          <Typography gutterBottom variant="h5" component="h4">
            {title}
          </Typography>
          <StyledTypography gutterBottom variant="p" component="p">
            <Home sx={{ fontSize: "2rem" }} />
            {address}
          </StyledTypography>
        </CardContent>
        <Divider light />
        <CardActions>
          <Button component={Link} to={`/brewery/update/${id}`}>
            Gérer
          </Button>
          <Button
            sx={{ color: "#f2cc96" }}
            variant="outlined"
            onClick={() => setIsOpen(true)}
          >
            Supprimer
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

// == Export
export default Brewerie;
