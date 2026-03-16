import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Auth */
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";

/* Layout */
import BuyerLayout from "./layouts/BuyerLayout";

/* Dashboards */
import BuyerDashboard from "./pages/BuyerDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import DealerDashboard from "./pages/DealerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

/* Pages */
import AuctionPage from "./pages/AuctionPage";
import CreateAuction from "./pages/CreateAuction";
import MarketPrice from "./pages/MarketPrice";
import FertilizerMarket from "./pages/FertilizerMarket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* Buyer Layout (Sidebar pages) */}
        <Route path="/buyer" element={<BuyerLayout />}>
          <Route index element={<BuyerDashboard />} />
          <Route path="market" element={<MarketPrice />} />
        </Route>

        {/* Other Dashboards */}
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/dealer" element={<DealerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Auction System */}
        <Route path="/auction" element={<AuctionPage />} />
        <Route path="/create-auction" element={<CreateAuction />} />

        {/* Market */}
        <Route path="/fertilizers" element={<FertilizerMarket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
