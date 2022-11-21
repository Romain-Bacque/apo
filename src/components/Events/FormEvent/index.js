// == Import
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./style.scss";
// == Composant
import Input from "../../Input";

function FormEvent() {
  return (
    <Box component="form">
      <Box component="form">
        <Typography variant="h2"> Ajouter un évènement </Typography>

        <Input
          id="standard-basic"
          variant="standard"
          name="adress"
          type="text"
          label="Adresse :"
          value="11 rue jacque tatie 78320 bois d'arcy"
        />

        <Input
          id="standard-basic"
          variant="standard"
          name="title"
          type="text"
          label="Nom de l'évènement :"
        />
        <Input
          id="standard-basic"
          variant="standard"
          name="event_start"
          type="date"
        />
        <Input
          id="standard-basic"
          variant="standard"
          name="description"
          type="text"
          label="Description :"
        />
      </Box>
      <Button variant="contained" type="submit">
        Ajouter
        <AddIcon />
      </Button>
    </Box>
  );
}

// == Export
export default FormEvent;
