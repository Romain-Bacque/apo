import { useEffect } from "react";
import BreweriesList from "../components/BreweriesList";
import { fetchFavorites } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export function FavoritesPage() {
  const { favorites } = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  useEffect(() => {
    const action = fetchFavorites();

    dispatch(action);
  }, []);

  return <BreweriesList data={favorites} />;
}
