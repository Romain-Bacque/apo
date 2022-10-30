import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";

import Layout from "./Layout";
import Map from "../Map";
import Login from "../Login";
import Register from "../Register";
import FormBrewerie from "../Form_brewerie";
import UpdateBrewery from "../Breweries/UpdateBrewery";
import OneBrewerie from "../One_brewerie";
import FormEvent from "../Events/FormEvent";
import Breweries from "../Breweries";
import Events from "../Events";
import OneEvent from "../Events/OneEvent";
import Profil from "../Profil";
import UpdateEventBrewery from "../Breweries/UpdateEventBrewery";
import NotFound from "../NotFound";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const isLogged = useSelector((state) => state.user.isLogged);
  const dispatch = useDispatch();
  const location = useLocation();

  // If current location is not home page, then we reset searchValue state
  useEffect(() => {
    if (location.pathname !== "/") {
      setSearchValue("");
    }
  }, [location]);

  // Check if user is currently connected
  useEffect(() => {
    dispatch({
      type: "USER_VERIFICATION",
    });
  }, [dispatch]);

  // Get all breweries list
  useEffect(() => {
    dispatch({
      type: "FETCH_BREWERIES",
    });
  }, [dispatch]);

  // Get all categories list
  useEffect(() => {
    dispatch({
      type: "FETCH_CATEGORIES",
    });
  }, [dispatch]);

  return (
    <>
      <Layout setSearchValue={setSearchValue}>
        <Routes>
          <Route path="/" element={<Map searchValue={searchValue} />} />
          <Route path="/breweries/:id" element={<OneBrewerie />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          {isLogged ? (
            <>
              <Route path="/breweries" element={<Breweries />} />
              <Route path="/brewery/form_brewery" element={<FormBrewerie />} />
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
      </Layout>
    </>
  );
}

export default App;
