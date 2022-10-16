import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function TagsList({ onTagDelete, list }) {
  const [chipData, setChipData] = useState([]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
    onTagDelete && onTagDelete(chipToDelete);
  };

  useEffect(() => {
    setChipData(list);
  }, [list]);

  return (
    <Paper
      variant="none"
      sx={{
        display: "flex",
        justifyContent: "start",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0.5,
      }}
      component="ul"
    >
      {chipData.length > 0 &&
        chipData.map((data) => {
          return (
            <ListItem key={data.id}>
              <Chip
                label={data.tag}
                onDelete={onTagDelete && handleDelete(data)}
              />
            </ListItem>
          );
        })}
    </Paper>
  );
}
