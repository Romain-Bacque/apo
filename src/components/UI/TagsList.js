import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

// Style
const StyledPaper = styled(Paper)({
  display: "flex",
  justifyContent: "start",
  flexWrap: "wrap",
  listStyle: "none",
  margin: "1rem 0",
});

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

// Component
function TagsList({ onTagDelete, list }) {
  const [chipData, setChipData] = useState([]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
    onTagDelete(chipToDelete);
  };

  useEffect(() => {
    setChipData(list);
  }, [list]);

  return (
    <StyledPaper variant="none" component="ul">
      {chipData.length > 0 &&
        chipData.map((data) => {
          return (
            data.id &&
            data.tag && (
              <ListItem key={data.id}>
                <Chip
                  sx={{ fontSize: "0.95rem" }}
                  label={data.tag}
                  onDelete={onTagDelete && handleDelete(data)}
                />
              </ListItem>
            )
          );
        })}
    </StyledPaper>
  );
}

TagsList.propTypes = {
  onTagDelete: PropTypes.func,
  list: PropTypes.array.isRequired,
};

export default TagsList;
