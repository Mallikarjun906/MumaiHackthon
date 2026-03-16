import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import FarmerDashboard from "./pages/FarmerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import DealerDashboard from "./pages/DealerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AuctionPage from "./pages/AuctionPage";
import FertilizerMarket from "./pages/FertilizerMarket";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
         <Route path="/login" element={<Login />} />

        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/dealer" element={<DealerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/auction" element={<AuctionPage />} />
        <Route path="/fertilizers" element={<FertilizerMarket />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/farmer" element={<FarmerDashboard />} />
<Route path="/buyer" element={<BuyerDashboard />} />
<Route path="/dealer" element={<DealerDashboard />} />
<Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;