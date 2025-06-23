import { Routes, Route, BrowserRouter } from "react-router-dom";
import CCALayout from "./layouts/CCALayout";
import DistributorLayout from "./layouts/DistributorLayout";
import CustomerLayout from "./layouts/CustomerLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CCALayout />} />
        <Route path="/distributor" element={<DistributorLayout />} />
        <Route path="/customer" element={<CustomerLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
