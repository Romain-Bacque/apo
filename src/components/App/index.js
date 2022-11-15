import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";

import Layout from "./Layout";
import Map from "../Map";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import ForgetPassword from "../authentication/ForgetPassword";
import ResetPassword from "../authentication/ResetPassword";
import OneBrewerie from "../One_brewerie";
import FormEvent from "../Events/FormEvent";
import Breweries from "../Breweries";
import Events from "../Events";
import OneEvent from "../Events/OneEvent";
import Profil from "../Profil";
import UpdateEventBrewery from "../Breweries/UpdateEventBrewery";
import NotFound from "../NotFound";
import BreweryForm from "../Breweries/BreweryForm";
import Profile from "../authentication/Profile";

function App() {
  const [searchValue, setSearchValue] = useState("");
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
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/breweries" element={<Breweries />} />
        <Route path="/breweries/:id" element={<OneBrewerie />} />
        <Route path="/brewery/breweryForm" element={<BreweryForm />} />
        <Route path="/brewery/breweryForm/:id" element={<BreweryForm />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<OneEvent />} />
        <Route path="/create-event" element={<FormEvent />} />
        <Route path="/brewery/event" element={<UpdateEventBrewery />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
