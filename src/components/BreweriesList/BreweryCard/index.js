// hook import
import { useDispatch, useSelector } from "react-redux";
// other import
import PropTypes from "prop-types";
import { Favorite, Home, Phone } from "@mui/icons-material";
// component import
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActions, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import TagsList from "../../UI/TagsList";
// styled component import
import {
  MoreDetailsButton,
  StyledBox,
  StyledDivider,
  StyledTypography,
} from "./style";
import { addFavorite, deleteFavorite } from "../../../actions";

// Component
function BrewerieCard({ id, title, phone, address, tags, image, favoriteIds }) {
  const { isLogged } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const parsedImage = JSON.parse(image);

  const isInUserFavorites = (breweryId, favoriteIds) => {
    if (favoriteIds?.length <= 0) return false;

    const isInFavoritesList = favoriteIds.find(
      (favoriteId) => favoriteId === breweryId
    );

    return !!isInFavoritesList;
  };

  const handleFavorites = (id) => {
    if (!isLogged) return;

    let action = null;

    if (!isInUserFavorites(id, favoriteIds)) {
      // add favorite
      action = addFavorite(id);

      dispatch(action);
    } else {
      // remove favorite
      action = deleteFavorite(id);
    }
    dispatch(action);
  };

  return (
    <Card elevation={0} variant="outlined">
      {parsedImage && (
        <CardMedia
          component="img"
          height="140px"
          width="100%"
          image={parsedImage.path}
          alt={`Photo de la brasserie '${title}'`}
        />
      )}
      <CardContent>
        <StyledBox>
          <Typography gutterBottom variant="h5" component="h4">
            {title}
          </Typography>
          <IconButton
            onClick={() => handleFavorites(id)}
            color={
              isLogged && isInUserFavorites(id, favoriteIds)
                ? "primary"
                : "default"
            }
            title={
              !isLogged
                ? "Vous devez être connecté pour pouvoir ajouter une recette en favories"
                : isInUserFavorites(id, favoriteIds)
                ? "Retirer des recettes favories"
                : "Ajouter aux recettes favories"
            }
            aria-label="Ajouter au favoris"
          >
            <Favorite />
          </IconButton>
        </StyledBox>
        <StyledTypography variant="p" component="p">
          <Home sx={{ fontSize: "2rem" }} />
          {address}
        </StyledTypography>
        <StyledTypography>
          <Phone sx={{ fontSize: "2rem" }} />
          {phone}
        </StyledTypography>
        <TagsList list={tags} />
        <StyledDivider light />
        <CardActions>
          <MoreDetailsButton size="small">
            <Link to={`/brewery/${id}`}>Plus de détails</Link>
          </MoreDetailsButton>
        </CardActions>
      </CardContent>
    </Card>
  );
}

BrewerieCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  image: PropTypes.string.isRequired,
};

export default BrewerieCard;
