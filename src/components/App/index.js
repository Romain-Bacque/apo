// hook import
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
// component import
import Layout from "./Layout/Layout";
// action creator import
import {
  fetchBreweries,
  fetchCategories,
  userVerification,
} from "../../actions";
// pages import
import { HomePage } from "../../pages/HomePage";
import { RegisterPage } from "../../pages/RegisterPage";
import { EmailConfirmPage } from "../../pages/EmailConfirmPage";
import { LoginPage } from "../../pages/LoginPage";
import { ProfilePage } from "../../pages/ProfilePage";
import { ForgotPasswordPage } from "../../pages/ForgotPasswordPage";
import { ResetPasswordPage } from "../../pages/ResetPasswordPage";
import { FavoritesPage } from "../../pages/FavoritesPage";
import { OwnerBreweriesPage } from "../../pages/OwnerBreweriesPage";
import { BreweryDetailsPage } from "../../pages/BreweryDetailsPage";
import { BreweryFormPage } from "../../pages/BreweryFormPage";
import { EventCalendarPage } from "../../pages/EventCalendarPage";
import { NotFoundPage } from "../../pages/NotFoundPage";
import { PrivateRoutes } from "../../utilities/PrivateRoutes";

function App() {
  const [isLocationAuthorized, setIsLocationAuthorized] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { isLogged, role } = useSelector((state) => state.user);
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
    if (location.pathname === "/") {
      const result = window.confirm(
        "Autorisez-vous le site à vous localiser ?"
      );

      setIsLocationAuthorized(result);
    }
  }, []);

  return (
    <Layout setSearchValue={setSearchValue}>
      {/* routes */}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              searchValue={searchValue}
              isLocationAuthorized={isLocationAuthorized}
            />
          }
        />
        <Route path="/brewery/:id" element={<BreweryDetailsPage />} />
        {/* private routes */}
        <Route element={<PrivateRoutes isAuthorized={!isLogged} />}>
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/signup/email-confirm" element={<EmailConfirmPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPasswordPage />}
          />
        </Route>
        <Route
          element={
            <PrivateRoutes isAuthorized={isLogged && role === "brewer"} />
          }
        >
          <Route path="/breweries" element={<OwnerBreweriesPage />} />
          <Route path="/brewery/breweryForm" element={<BreweryFormPage />} />
          <Route
            path="/brewery/breweryForm/:id"
            element={<BreweryFormPage />}
          />
        </Route>
        <Route element={<PrivateRoutes isAuthorized={isLogged} />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/eventCalendar" element={<EventCalendarPage />} />
        </Route>
        {/* not found page route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
