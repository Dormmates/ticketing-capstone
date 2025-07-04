import { Routes, Route, Navigate } from "react-router-dom";
import CCALayout from "../layouts/CCALayout";
import DistributorLayout from "../layouts/DistributorLayout";

import Login from "../pages/CCALogin";
import { useAuthContext } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import DistributorDashboard from "../pages/modules/distributor/DistributorDashboard";
import CCADashboard from "../pages/modules/cca/CCADashboard";
import DistributorLogin from "../pages/DistributorLogin";
import CustomerLayout from "../layouts/CustomerLayout";
import CustomerHome from "../pages/modules/customer/CustomerHome";
import Unauthorized from "../pages/Unauthorized";
import NotFound from "../pages/NotFound";

const AppRoute = () => {
  const { user } = useAuthContext();

  console.log(user);

  return (
    <Routes>
      {/** Route for CCA*/}
      <Route
        path="/"
        element={
          !user ? (
            <Login />
          ) : user.role === "distributor" ? (
            <Navigate to="/distributor" />
          ) : (
            <ProtectedRoute allowedRoles={["head", "trainer"]}>
              <CCALayout />
            </ProtectedRoute>
          )
        }
      >
        <Route index element={<CCADashboard />} />
      </Route>

      {/** Route for Distributor*/}
      <Route
        path="/distributor"
        element={
          <ProtectedRoute allowedRoles={["distributor"]}>
            <DistributorLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DistributorDashboard />} />
      </Route>

      <Route
        path="/distributor/login"
        element={user ? user.role === "distributor" ? <Navigate to="/distributor" /> : <Navigate to="/" /> : <DistributorLogin />}
      />

      {/** Route for Customer*/}
      <Route path="/customer" element={<CustomerLayout />}>
        <Route index element={<CustomerHome />} />
      </Route>

      {/** Other Routes*/}
      <Route path="/unathorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoute;
