import { Routes, Route, Navigate } from "react-router-dom";
import CCALayout from "../layouts/CCALayout";
import DistributorLayout from "../layouts/DistributorLayout";

import { useAuthContext } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import DistributorDashboard from "../pages/distributor/DistributorDashboard";
import DistributorLogin from "../pages/distributor/DistributorLogin";
import CustomerLayout from "../layouts/CustomerLayout";

import Unauthorized from "../pages/Unauthorized";
import NotFound from "../pages/NotFound";
import {
  AccountRequests,
  CCAHead,
  Distributors,
  Trainers,
  CreateShow,
  AddSchedule,
  Shows,
  ViewShow,
  MajorProduction,
  PerformingGroups,
  SeatMap,
  CCADashboard,
  CCALogin,
} from "../pages/cca/index";
import DistributorHistory from "../pages/distributor/DistributorHistory";

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
            <CCALogin />
          ) : (
            <ProtectedRoute allowedRoles={["head", "trainer"]}>
              <CCALayout />
            </ProtectedRoute>
          )
        }
      >
        <Route index element={<CCADashboard />} />
        <Route path="shows" element={<Shows />} />
        <Route path="shows/add" element={<CreateShow />} />
        <Route path="shows/add/schedule/:id" element={<AddSchedule />} />
        <Route path="shows/:id" element={<ViewShow />} />
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
        <Route path="history" element={<DistributorHistory />} />
      </Route>

      <Route
        path="/distributor/login"
        element={user ? user.role === "distributor" ? <Navigate to="/distributor" /> : <Navigate to="/" /> : <DistributorLogin />}
      />

      {/** Other Routes*/}
      <Route path="/unathorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoute;
