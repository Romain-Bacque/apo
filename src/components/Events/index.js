import { Grid, Typography } from "@mui/material";

import "./style.scss";
import Event from "./Event";

function Events() {
  return (
    <>
      <Typography variant="h2">Mes évènements (1)</Typography>
      <Grid container>
        <Event />
      </Grid>
    </>
  );
}

// == Export
export default Events;
