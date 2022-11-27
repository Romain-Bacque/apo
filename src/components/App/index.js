// hook import
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
// component import
import Layout from "./Layout";
import Map from "../Map";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import ForgetPassword from "../authentication/ForgetPassword";
import ResetPassword from "../authentication/ResetPassword";
import BreweryDetails from "../brewery/BreweryDetails";
import OwnerBreweries from "../brewery/OwnerBreweries";
import Profile from "../Profile";
import NotFound from "../NotFound";
import BreweryForm from "../brewery/BreweryForm";
import EventCalendar from "../events/EventCalendar";

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

  // Ask for location authorization
  useEffect(() => {
    const result = window.confirm(
      "Voulez-vous autoriser le site à vous localiser ?"
    );

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
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
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
