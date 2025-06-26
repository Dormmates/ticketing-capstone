import { Routes, Route } from "react-router-dom";
import CCALayout from "../layouts/CCALayout";
import DistributorLayout from "../layouts/DistributorLayout";
import CustomerLayout from "../layouts/CustomerLayout";
import Auth from "../_auth/Auth";
import Login from "../pages/Login";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />}>
        <Route index element={<CCALayout />} />
        <Route path="/distributor" element={<DistributorLayout />} />
      </Route>
      <Route path="/customer" element={<CustomerLayout />} />

      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoute;
