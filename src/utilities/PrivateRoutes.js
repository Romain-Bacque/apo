import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = ({ isAuthorized }) => {
  return isAuthorized ? <Outlet /> : <Navigate to="/" />;
};
