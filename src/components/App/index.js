import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";

import Layout from "./Layout";
import Map from "../Map";
import Login from "../authentification/Login";
import Register from "../authentification/Register";
import ForgetPassword from "../authentification/ForgetPassword";
import ResetPassword from "../authentification/ResetPassword";
import OneBrewerie from "../One_brewerie";
import FormEvent from "../Events/FormEvent";
import Breweries from "../Breweries";
import Events from "../Events";
import OneEvent from "../Events/OneEvent";
import Profil from "../Profil";
import UpdateEventBrewery from "../Breweries/UpdateEventBrewery";
import NotFound from "../NotFound";
import BreweryForm from "../Breweries/BreweryForm";

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
    <Layout setSearchValue={setSearchValue}>
      <Routes>
        <Route path="/" element={<Map searchValue={searchValue} />} />
        <Route path="/breweries/:id" element={<OneBrewerie />} />
        {!isLogged && (
          <>
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route
              path="/reset-password/:id/:token"
              element={<ResetPassword />}
            />
          </>
        )}
        {isLogged && (
          <>
            <Route path="/breweries" element={<Breweries />} />
            <Route path="/brewery/breweryForm" element={<BreweryForm />} />
            <Route path="/brewery/breweryForm/:id" element={<BreweryForm />} />
            <Route path="/create-event" element={<FormEvent />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<OneEvent />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/brewery/event" element={<UpdateEventBrewery />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
