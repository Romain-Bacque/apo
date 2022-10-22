// == Import
import { Routes, Route } from "react-router-dom";
import { Box, Container, CssBaseline } from "@mui/material";

// == Composant
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
import Test from "../Test";
import UpdateEventBrewery from "../Breweries/UpdateEventBrewery";
import CustomSnackbars from "../UI/CustomSnackbars";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../selector/theme";
import Error from "../Error";
import Loader from "../UI/loader";

let loadingContent = null;

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch({
      type: "USER_VERIFICATION",
    });
  }, [dispatch]);

  const isLogged = useSelector((state) => state.user.isLogged);

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

  // useEffect(() => {
  //   if (loading.statut) {
  //     setIsOpen(true);
  //   }

  //   const timer = setTimeout(() => {
  //     dispatch({
  //       type: "RESET_SNACKBAR",
  //     });
  //   }, 5000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [loading.message, loading.statut, dispatch]);

  useEffect(() => {
    if (loading.statut === "pending") {
      loadingContent = <Loader />;
    } else if (loading.statut !== "pending" && loading.message) {
      setIsOpen(true);
      loadingContent = (
        <CustomSnackbars
          message={loading.message}
          statut={loading.statut}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      );
    }
  }, [loading, isOpen]);

  return (
    <>
      {loadingContent}
      <Box>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Container conponent="main" sx={{ fontFamily: "Silkscreen" }}>
            <Routes>
              <Route path="/" element={<Map />} />
              <Route path="/breweries/:id" element={<OneBrewerie />} />
              <Route path="/search/:value" element={<BreweriesList />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Error />} />
              {isLogged ? (
                <>
                  <Route path="/breweries" element={<Breweries />} />
                  <Route
                    path="/brewery/form_brewery"
                    element={<FormBrewerie />}
                  />
                  <Route
                    path="/brewery/update/:id"
                    element={<UpdateBrewery />}
                  />
                  <Route path="/create-event" element={<FormEvent />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/events/:id" element={<OneEvent />} />
                  <Route path="/profil" element={<Profil />} />
                  <Route
                    path="/Brewery/event"
                    element={<UpdateEventBrewery />}
                  />
                </>
              ) : (
                <Route path="*" element={<Login />} />
              )}
              <Route path="/test" element={<Test />} />
            </Routes>
          </Container>
          {/* <Footer /> */}
        </ThemeProvider>
      </Box>
    </>
  );
}

// == Export
export default App;
