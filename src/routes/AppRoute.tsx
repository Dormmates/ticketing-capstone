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
import Shows from "../pages/modules/cca/Shows";
import MajorProduction from "../pages/modules/cca/MajorProduction";
import PerformingGroups from "../pages/modules/cca/PerformingGroups";
import Trainers from "../pages/modules/cca/Accounts/Trainers";
import Distributors from "../pages/modules/cca/Accounts/Distributors";
import CCAHead from "../pages/modules/cca/Accounts/CCAHead";
import AccountRequests from "../pages/modules/cca/Accounts/AccountRequests";
import SeatMap from "../pages/modules/cca/SeatMap";

const AppRoute = () => {
  const { user } = useAuthContext();

  if (user) {
    if (user.role === "distributor") {
      console.log("Logged In Distributor");
      console.log(user);
    } else {
      console.log("Logged In User");
      console.log(user);
    }
  }

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
        <Route path="shows" element={<Shows />} />
        <Route path="major-production" element={<MajorProduction />} />
        <Route path="performing-groups" element={<PerformingGroups />} />
        <Route path="manage/trainers" element={<Trainers />} />
        <Route path="manage/distributors" element={<Distributors />} />
        <Route path="manage/cca-head" element={<CCAHead />} />
        <Route path="manage/request" element={<AccountRequests />} />
        <Route
          path="seat"
          element={
            <ProtectedRoute allowedRoles={["head"]}>
              <SeatMap />
            </ProtectedRoute>
          }
        />
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
