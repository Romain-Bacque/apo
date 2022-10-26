import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";
import { Box, Container, CssBaseline } from "@mui/material";
import Header from "../Header";
import Map from "../Map";
import Login from "../Login";
import Register from "../Register";
import FormBrewerie from "../Form_brewerie";
import UpdateBrewery from "../Breweries/UpdateBrewery";
import OneBrewerie from "../One_brewerie";
import BreweriesList from "../BreweriesList";
import FormEvent from "../Events/FormEvent";
import Breweries from "../Breweries";
import Events from "../Events";
import OneEvent from "../Events/OneEvent";
import Profil from "../Profil";
import UpdateEventBrewery from "../Breweries/UpdateEventBrewery";
import CustomSnackbars from "../UI/CustomSnackbars";
import NotFound from "../NotFound";

let loadingContent = null;

function App() {
  const loading = useSelector((state) => state.loading);
  const [isOpen, setIsOpen] = useState(false);
  const isLogged = useSelector((state) => state.user.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "USER_VERIFICATION",
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: "FETCH_BREWERIES",
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: "FETCH_CATEGORIES",
    });
  }, [dispatch]);

  useEffect(() => {
    if (loading.statut !== "info" && loading.message) {
      setIsOpen(true);
    }
  }, [loading]);

  return (
    <>
      {loading.statut !== "info" && loading.message && (
        <CustomSnackbars
          message={loading.message}
          statut={loading.statut}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      <Box>
        <CssBaseline />
        <Header />
        <Container component="main" sx={{ fontFamily: "Silkscreen" }}>
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path="/breweries/:id" element={<OneBrewerie />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            {isLogged ? (
              <>
                <Route path="/breweries" element={<Breweries />} />
                <Route
                  path="/brewery/form_brewery"
                  element={<FormBrewerie />}
                />
                <Route path="/brewery/update/:id" element={<UpdateBrewery />} />
                <Route path="/create-event" element={<FormEvent />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<OneEvent />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/Brewery/event" element={<UpdateEventBrewery />} />
              </>
            ) : (
              <Route path="*" element={<Login />} />
            )}
          </Routes>
        </Container>
        {/* <Footer /> */}
      </Box>
    </>
  );
}

// == Export
export default App;
