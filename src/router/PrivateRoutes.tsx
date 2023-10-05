import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const authenticated = false;
  const getToken = () => {
    return sessionStorage.getItem("guestSessionId");
  };
  const token = getToken();
  if (authenticated || token) return <Outlet />;
  return <Navigate to="/" />;
};

export default PrivateRoutes;
