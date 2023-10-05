import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoutes";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path="/inicio" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Router;
