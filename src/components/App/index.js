// hook import
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
// component import
import Layout from "./Layout/Layout";
import Map from "../Map";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import ForgotPassword from "../authentication/ForgotPassword";
import ResetPassword from "../authentication/ResetPassword";
import BreweryDetails from "../brewery/BreweryDetails";
import OwnerBreweries from "../brewery/OwnerBreweries";
import Profile from "../Profile";
import NotFound from "../NotFound";
import BreweryForm from "../brewery/BreweryForm";
import EventCalendar from "../events/EventCalendar";
// action creator import
import {
  fetchBreweries,
  fetchCategories,
  userVerification,
} from "../../actions";

function App() {
  const [isLocationAuthorized, setIsLocationAuthorized] = useState(null);
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
    const action = userVerification();

    dispatch(action);
  }, [dispatch]);

  // Get all breweries
  useEffect(() => {
    const action = fetchBreweries();

    dispatch(action);
  }, [dispatch]);

  // Get all categories
  useEffect(() => {
    const action = fetchCategories();

    dispatch(action);
  }, [dispatch]);

  // Ask for location authorization
  useEffect(() => {
    const result = window.confirm("Autorisez-vous le site à vous localiser ?");

    setIsLocationAuthorized(result);
  }, []);

  return (
    <Layout setSearchValue={setSearchValue}>
      <Routes>
        <Route
          path="/"
          element={
            <Map
              isLocationAuthorized={isLocationAuthorized}
              searchValue={searchValue}
            />
          }
        />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/breweries" element={<OwnerBreweries />} />
        <Route path="/brewery/:id" element={<BreweryDetails />} />
        <Route path="/brewery/breweryForm" element={<BreweryForm />} />
        <Route path="/brewery/breweryForm/:id" element={<BreweryForm />} />
        <Route path="/eventCalendar" element={<EventCalendar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
