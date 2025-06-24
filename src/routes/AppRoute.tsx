import { Routes, Route } from "react-router-dom";
import CCALayout from "../layouts/CCALayout";
import DistributorLayout from "../layouts/DistributorLayout";
import CustomerLayout from "../layouts/CustomerLayout";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<CCALayout />} />
      <Route path="/distributor" element={<DistributorLayout />} />
      <Route path="/customer" element={<CustomerLayout />} />
    </Routes>
  );
};

export default AppRoute;
